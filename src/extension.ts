'use strict';
import * as vscode from 'vscode';
import { Sushier } from './🍣erToolBarItem';

let sushier: Sushier;

function getSushi(context: vscode.ExtensionContext) : Sushier {
    if (!sushier)
        sushier = new Sushier(context, vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000), 'extension.needMoreSushi');
    return sushier;
}

export function activate(context: vscode.ExtensionContext) {

    interface Commands {
        id: string;
        command: (context: vscode.ExtensionContext) => any;
    }
    let commands: Commands[] = [
        {
            id: 'extension.sushiOnStatusBar',
            command: () => getSushi(context)
        },
        {
            id: 'extension.needMoreSushi',
            command: () => getSushi(context).needMoreSushi()
        }
    ];

    commands.forEach(cmd => {
        context.subscriptions.push(vscode.commands.registerCommand(cmd.id, cmd.command));
    });
}

export function deactivate() {
    if (sushier) {
        sushier.dispose();
        sushier = null;
    }
}