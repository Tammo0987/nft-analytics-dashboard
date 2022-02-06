import Mustache from 'mustache';
import solc from 'solc';
import * as fs from "fs";

export default function generate(metadata) {
    const contractTemplate = fs.readFileSync('templates/template.sol', 'utf8').toString();

    // Render with mustache
    const contract = Mustache.render(contractTemplate, metadata);
    const contractFileName = `${metadata.contractName}.sol`;

    const content = {
        content: contract
    };

    const sources = {};
    sources[contractFileName] = content;

    // Prepare solc input
    const input = {
        language: 'Solidity',
        sources,
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };


    // Compile and handle errors
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (!output) {
        throw Error('Compilation failed with no output.');
    } else if (output.errors) {
        output.errors.map(error => console.error(error));
        throw Error('Compilation had errors.');
    }

    // Map to contract object
    const compiledContract = output.contracts[contractFileName][metadata.contractName];

    return {
        abi: compiledContract.abi,
        bytecode: compiledContract.evm.bytecode.object
    }
}