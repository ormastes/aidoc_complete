// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { MarkdownParser } from './markdown_parser';
import { OpenAIInterface } from './openai_interface';

var openaiInterface :OpenAIInterface|null= null;
var markdownParser :MarkdownParser|null = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const provider = vscode.languages.registerCompletionItemProvider('markdown', {
		async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			var openaiInterface = new OpenAIInterface();
			var markdownParser = new MarkdownParser();
			// get document filename
			var filename = document.fileName;
			// get whole document text
			var wholeText = document.getText();
			// get text before cursor
			var textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
			// get text after cursor
			var textAfterCursor = document.getText(new vscode.Range(position, new vscode.Position(document.lineCount, 0)));

			var toc = markdownParser.parseTOC(wholeText);

			var suggestion = openaiInterface.complete(
				filename, toc, textBeforeCursor, textAfterCursor);

			// a simple completion item which inserts `Hello World!`
			const simpleCompletion = new vscode.CompletionItem(await suggestion);
			return [simpleCompletion];
		}
	});


	context.subscriptions.push(provider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
