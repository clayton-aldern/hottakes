var words = ["theorem", "conjecture", "postulate", "axiom", "law", "lemma", "corollary", "formula", "proof", "proofs", "prooves", "QED", "Q\\.E\\.D", "theorems"];
var replacements = ["hot take", "spicy take", "copypasta", "unpopular opinion", "headcanon", "weird flex", "shitpost", "mic drop", "big mood", "nuclear take", "life hack", "galaxy brain", "memegen", "tweetstorm", "sign bunny", "clickbait", "#slatepitch", "snowclone"];

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (w in words){
        var word = words[w];
        var test = "\\b"+word+"\\b((?<=D)\\.)?"; // a little funky because of QED v. Q.E.D. v. other cases
        var re = new RegExp(test,"ig");
        // some special cases
        if (word === "proof" || word === "proofs") {
            var replacement = "receipts";
        } else if (word === "prooves") {
            var replacement = "has the receipts to show";
        } else if (word === "QED" || word === "Q\\.E\\.D") {
            var replacement = "That's the tea";
        } else if (word === "theorems") {
            var replacement = "hot takes";
        } else { // otherwise, just pick a random replacement
            var replacement = replacements[Math.floor(Math.random()*replacements.length)];
        }
        
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replace(re, function(match) {
                    if (word === "QED" || word === "Q\\.E\\.D"){
                        return replacement; // don't match case for the abbreviations
                    } else {
                        return matchCase(replacement, match); // otherwise, do
                    }
                });

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

function matchCase(txt, pat) {
    var result = '';

    for(var i = 0; i < txt.length; i++) {
        var c = txt.charAt(i);
        var p = pat.charCodeAt(i);

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}