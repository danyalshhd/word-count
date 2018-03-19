function PostsListController(postsSvc, $timeout){
    postsSvc.getPosts().then(response => {
        this.completePosts = commonFiveWords(response.data);
        $timeout(function () {
            $('[data-toggle="popover"]').popover()
        })
    })
}

function commonFiveWords(customers) {

    let wordCounts = {};
    let companyName = {}
    let common_words = "the,it,is,we,all,a,an,by,to,you,me,he,she,they,we,how,it,i,are,to,for,of,at,and,in";
    let splitCommonWords = common_words.split(',')
    let sortableWordsOccurences = [];

    customers.map(cs => {
        let words = cs.companyName.split(" ")
        for(let i = 0; i < words.length; i++) {
            if(words[i].length > 2){
                let word = words[i].toLowerCase()
                let isCommonWord = false
                for( let j = 0; j < splitCommonWords.length; j++) {
                    if(splitCommonWords[j] == word){
                        isCommonWord = true
                        break
                    }
                }
                if(isCommonWord == true){
                    break
                } else {
                    wordCounts[word] = (wordCounts[word] || 0) + 1

                    if(companyName[word] == undefined){
                        companyName[word] = []
                    }
                    if(companyName[word].length < 5)
                    companyName[word].push(cs.companyName)
                }
            }
        }
    })

    for (let word in wordCounts) {
        for (let wordInCompany in companyName) {
            if(wordInCompany == word){
                let companyHtml = ""
                for(let cpny of companyName[wordInCompany]){
                    companyHtml += '<p><b>' + cpny + '</b></p>'
                }
                sortableWordsOccurences.push([word, wordCounts[word], companyHtml])
                break
            }
        }
    }

    sortableWordsOccurences.sort(function(a, b) {
        return b[1] - a[1];
    });
    let fiveMostCommonWords = sortableWordsOccurences.slice(0, 5)

    let startIndex = null
    let endIndex = null
    let indexStartCounter = 0
    let indexEndCounter = 0
    for(let fmc of fiveMostCommonWords){
        if(indexStartCounter != 0 && fmc[1] == fiveMostCommonWords[indexStartCounter - 1][1]){
            startIndex = indexStartCounter - 1
            break
        }
        indexStartCounter++
    }

    if(startIndex != null) {
        for (let fmc of fiveMostCommonWords) {
            if (indexEndCounter != 0 && fmc[1] == fiveMostCommonWords[startIndex][1] && fmc[1] != fiveMostCommonWords[indexEndCounter + 1][1]) {
                endIndex = indexEndCounter + 1
                break
            }
            indexEndCounter++
        }
    }

    if(startIndex != null){
        endIndex = endIndex == null ? fiveMostCommonWords.length : endIndex
        let toSortAlphabatically = fiveMostCommonWords.slice(startIndex, endIndex)

        toSortAlphabatically.sort(function(a, b){
            if(a[0] < b[0]) return -1;
            if(a[0] > b[0]) return 1;
            return 0;
        })

        fiveMostCommonWords.splice(startIndex, toSortAlphabatically.length)
        fiveMostCommonWords.splice(startIndex, 0, ...toSortAlphabatically)
    }

    return fiveMostCommonWords
}

app.component('postsList', {
    templateUrl: 'posts-list/posts-list.html',
    controller: PostsListController,
    controllerAs: 'vm'
})