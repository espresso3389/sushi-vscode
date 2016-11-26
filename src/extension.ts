'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
let timer: NodeJS.Timer;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "sushi-vscode" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sushiOnStatusBar', () => {
        if (!statusBarItem) {
            statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
            let t = 0;
            timer = setInterval(() => {
                t = t + 1;
                let sushies = t % 2 == 1 ? '' : ' ';
                for (let i = 0; i < 5 * 3; i++)
                    sushies += (i + t / 2) % 5 >= 2 ? '\u{3000}' : '🍣';
                sushies += t % 2 == 0 ? '' : ' ';
                statusBarItem.text = '[' + sushies + ']';
                statusBarItem.show();
            }, 300);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    clearInterval(timer);
    statusBarItem.dispose();
}