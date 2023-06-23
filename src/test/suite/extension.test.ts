import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

// import my new openai_interface.ts file
import {OpenAIInterface} from '../../openai_interface';

import {MarkdownParser} from '../../markdown_parser';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('OpenAIInterface test', async () => {
		// create a new OpenAIInterface object
		var openaiInterface = new OpenAIInterface();
		// test the complete() method
		var previousLines = '[addition of 1+1]:#';
		var toc = 'None';
		var result = openaiInterface.complete('Calculation', toc, previousLines, 'None');
		var resultString = await result;
		// resultString contain 'add'
		assert.strictEqual(resultString.includes('add'), true);
	}).timeout(100000);

	test('MarkdownParser test', async () => {
		let TOC = new MarkdownParser().parseTOC(`# a
sdfsdfs
## b
### c
# d
dfdfsfd
`);
        assert.equal(TOC, `# a
## b
### c
# d
`);
	});
});