import { Configuration, OpenAIApi } from "openai";
import * as vscode from 'vscode';

// Create class for OpenAI interface. It has init() and complete() methods.

export class OpenAIInterface {
    openai: any;
    configuration: any;
    model: any;
    constructor() {
        // get setting vscode doc_complete.openaikey
        var docComplete = vscode.workspace.getConfiguration('aidoc_complete');
        var apiKey = docComplete.openaikey;
        this.model = docComplete.model;
        apiKey = (apiKey === null)? process.env.OPENAI_API_KEY : apiKey;
        // show message that apikey is not set. and exit.
        if (apiKey === null) {
            console.log('OpenAI API key is not set. Please set OPENAI_API_KEY environment variable.');
            process.exit(1);
        }
        this.model = (this.model === null)? 'gpt-4' : this.model;
        this.configuration = new Configuration({
            apiKey: apiKey,
        });
        this.openai = new OpenAIApi(this.configuration);
    }
    

    async complete(fileName: string, toc: string='None', previousLines: string = 'None', nextLines: string) {
        // null or space only empty string to 'None' for TOC, previousLines, and nextLines
        toc = toc? (toc.trim() === '' ? 'None' : toc): 'None';
        previousLines = previousLines? (previousLines.trim() === '' ? 'None' : previousLines): 'None';
        nextLines = nextLines? (nextLines.trim() === '' ? 'None' : nextLines): 'None';

        
        
        // parse file name string to get only file name and extension
        var aFile = fileName.split('\\').pop()?.split('/').pop()?.split('.') || '';
        var title = aFile[0];
        var extension = aFile[1];


        // Begin constructing the instruction.
        let instruction = `You are authoring a book titled "${title}", with the file extension "${extension}". Please use the following information as a guide:\n`;

        if (previousLines !== 'None') {
            // get last line of previousLines
            var lastLine = previousLines.split('\n').pop();
            // last line start with '#'
            if (lastLine?.startsWith('#')) {
                instruction += 'The last line ended with a heading (\'#\'). Please complete the heading and provide the content under this heading.\n';
            } else {
                instruction += 'Please continue the narrative from the last line.\n';
            }
        }

        if (nextLines !== 'None') {
            instruction += 'The subsequent draft lines need refinement or expansion. Use these as a starting point:\n';
        }
        
        instruction += 'Here are the contents so far:\n';
        
        if (toc !== 'None') {
            instruction += `Table of Contents (TOC):\n${toc}\n`;
        }
        
        if (nextLines !== 'None') {
            instruction += `Next draft lines:\n${nextLines}\n`;
        }
        // count # in toc
        var headingCount = toc.split('\n').length;
        if (previousLines !== 'None' || headingCount > 1) {
            instruction += `Previous lines:\n${previousLines}\n`;
            if (nextLines !== 'None') {
                instruction += 'Your task is to continue the narrative following the "Previous lines" and to refine or replace the "Next draft lines".\n';
            } else {
                instruction += 'Your task is to continue the narrative following the "Previous lines".\n';
            }
        } else {
            instruction += 'This is the beginning of the document. Please rephrase the title if needed, add TOC.\n';
        }
        
       
        
        // Complete the prompt.
        const chatCompletion = await this.openai.createChatCompletion({
            model: this.model,
            messages: [
                //{role: "system", content: instruction},
                {role: "user", content: instruction}]
        });
        // check chatCompletion is CreateChatCompletionResponse
        if (chatCompletion === null || chatCompletion.data === null || chatCompletion.data.choices === null || chatCompletion.data.choices.length === 0) {
            console.log('OpenAI returned null or empty string.');
            return '';
        }
        // check chatCompletion.data.choices[0].message.content is null or empty string.
        if (chatCompletion.data.choices[0].message === null || chatCompletion.data.choices[0].message.content === null || chatCompletion.data.choices[0].message.content.trim() === '') {
            // show message and return ''
            console.log('OpenAI returned null or empty string.');
            return '';
        }
        return chatCompletion.data.choices[0].message.content;
    }
}