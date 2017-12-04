/**
* 除去字符串空格
* @param type: 1-所有空格 2-前后空格 3-前空格 4-后空格
* @return string
*/
function trim(str, type){
    switch(type){
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.repalce(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
* 字母大小写切换
* @param type
*   1 - 首字母大写
*   2 - 首字母小写
*   3 - 大小写转换
*   4 - 全部大写
*   5 - 全部小写
*/
function changeCase(str, type){
    function toggleCase(str){
        str.split("").forEach({
            function(item){
                if(/^([a-z]+)/.test(item)){
                    itemText += item.toUpperCase();
                }else{
                    itemText += item;
                }
            }
        });
        return itemText;
    }
    switch(type){
        case 1:
            return str.replace(/^(\w)(\w+)/, function(v, v1, v2){
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\W+)/, function(v, v1, v2){
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
* 字符串循环复制
* @param str 字符串
* @param count 次数
* @return string
*/
function repeatStr(str, count){
    var text = "";
    for(var i=0; i<count; i++){
        text += str;
    }
    return text;
}

/**
* 字符串替换
* @param str 源字符串
* @param findText 要替换的字符串
* @param repText 替换成的字符串
* @return string
*/
function replaceAll(str, findText, repText){
    var raRegExp = new RegExp(findText, "g");
    return str.replace(raRegExp, repText);
}

/**
* 替换
* @param str 字符串
* @param regArr 字符格式
* @param type 替换方式
* @param repText 替换的字符（默认*）
* @return string
*/
function replaceStr(str, regArr, type, repText){
    var regtext = "",
        Reg = null,
        replaceText = repText || "*";
    // repalceStr('18819322663', [3,5,3], 0)
    // 188*****663
    // repeatStr是上面定义过的(字符串循环复制)
    if(regArr.length === 3 && type === 0){
        regtext = '(\\w{'+regArr[0]+'})\\w{'+regArr[1]+'}(\\w{'+regArr[2]+'})';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1'+replaceCount+'$2');
    }
    // relaceStr('asdasdasdaa', [3,5,3], 1)
    // ***asdas***
    else if(regArr.length === 3 && type === 1){
        regtext = '\\w{'+regArr[0]+'}(\\w{'+regArr[1]+'}\\w{'+regArr[2]+'}';
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatStr(replaceText, regArr[0]);
        var replaceCount2 = repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2);
    }
    // replaceStr('1asd88465asdwqe3', [5], 0)
    // *****8465asdwqe3
    else if(regArr.length === 1 && type == 0){
        regtext = '(^\\w{' + regArr[0] + '})';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount);
    }
    // replaceStr('1asd88465asdwqe3', [5], 1)
    // 1asd88465as+++++
    else if(regArr.length === 1 && type == 1){
        regtext = '(\\w{' + regArr[0] + '}$)';
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount);
    }
}
