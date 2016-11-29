import * as vscode from 'vscode';
let openurl = require('openurl');

const Interval = 250;

export class Sushier extends vscode.Disposable
{
    statusBarItem: vscode.StatusBarItem;
    timer: NodeJS.Timer;
    enableSpecial = true;
    isSushiMode = true;

    // [12] stands for the first sushi and [34] does the second one.
    // This logic is very important to deal with variable length emoji character
    // sequence.
    sushiBelt: string = '1234      '.repeat(3);

    constructor(context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem, command: string)
    {
        super(() => this.close());
        this.statusBarItem = statusBarItem;

        this.timer = setInterval(() => {
            let glyphs = ['🍣', '🍣'];
            let tooltip = 'Wow, what a wonderful Sushi time!';
            this.isSushiMode = true;

            if (this.enableSpecial) {
                let date = new Date();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                if (d == 29) {
                    // Wow, it's Meat day
                    glyphs = ['🍖', '🍖'];
                    tooltip = 'Good Meat day!';
                    this.isSushiMode = false;
                } else if (m == 12 && d == 25) {
                    glyphs = ['🎅', '🎄'];
                    tooltip = 'Merry Christmas!';
                    this.isSushiMode = false;
                }
            }

            // scroll; so weird logic to stabilize the pixel size of the string
            let sushiBelt = this.sushiBelt.slice(1) + this.sushiBelt.slice(0, 2);
            this.sushiBelt = sushiBelt.slice(0, -1);
            this.statusBarItem.text = '[' + sushiBelt.replace(/12/g, glyphs[0]).replace(/34/g, glyphs[1]).replace(/[1234]/g, ' ') + ']';
            this.statusBarItem.show();
            this.statusBarItem.command = command;
            this.statusBarItem.tooltip = tooltip;
        }, Interval);
    }

    public needMoreSushi() : void {
        // The user does not need anything but 🍣!
        this.enableSpecial = !this.enableSpecial;
        if (this.isSushiMode)
            openurl.open('https://www.google.co.jp/maps/search/sushi');
    }

    private close() : void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
            this.statusBarItem = null;
        }
    }
}
