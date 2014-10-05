var fontLen = 18;

var showFont = function() {
  var dirIndex = Math.ceil(Math.random() * fontLen);

  var items = document.querySelectorAll('.item');
  var container = document.querySelector('.container');
  var len = items.length;
  var imgs = [];
  var randomImgs = [];
  var imgIndex;
  var answerQueue = 0;

  for(var i = 0; i < 4; i++) {
    imgs.push(i);
  }
  for(var i = fontLen+1; i  ; i--) {
    randomImgs.push(imgs.splice(Math.floor(Math.random()*imgs.length), 1)[0]);
  }
  // console.log(randomImgs)

  for(var i = 0; i < len; i++) {
    items[i].querySelector('img').setAttribute('src','./img/'+dirIndex+'/'+(randomImgs[i]+1)+'.png' );
    // items[i].setAttribute('answer',randomImgs[i]);

    items[i].addEventListener('click', function(e) {
      if(hasClass(this, 'active')) {
        
        container.setAttribute('answerQueue', --answerQueue);
        removeClass(this, 'active');
        var currentQueue = this.getAttribute('answerQueue');
        removeItemClass(this, currentQueue);
        
        this.setAttribute('answerQueue','');
        for(var j = 0; j < len; j++) {
          var itemQueue = items[j].getAttribute('answerQueue');

          if(itemQueue > currentQueue) {
            items[j].setAttribute('answerQueue', itemQueue - 1);
            removeItemClass(items[j], itemQueue);
            addItemClass(items[j], itemQueue-1);
          }
        }
      } else {
        addClass(this, 'active');
        addItemClass(this, container.getAttribute('answerQueue'));
        this.setAttribute('answerQueue', container.getAttribute('answerQueue'));
        container.setAttribute('answerQueue', ++answerQueue);
      }
      
      
    }, false);
  }

  document.querySelector('.submit').addEventListener('click', function(e){
    if(container.getAttribute('answerQueue') !== '4') {
      alert('请全部排序选择！');
      return;
    }
    var len = items.length;
    var passed = true;
    for(var i = 0; i < len; i++) {
      if(~~items[i].getAttribute('answerQueue') !== randomImgs[i]) {
        passed = false;
        break;
      }
    }
    if(passed) {
      alert('通过了！');
      window.location.reload();
    } else {
      alert('答案错误了。');
    }
  }, false);
};


function addClass(ele, newClassName) {
  var className = ele.className;
  if(hasClass(ele, newClassName)) {
    return;
  }
  className += ' ' + newClassName;
  ele.className = className;

}
function addItemClass(ele, id) {
  addClass(ele, 'i'+id);
}
function removeClass(ele, query) {
  var className = ele.className;
  if(!hasClass(ele, query)) {
    return;
  }
  ele.className = className.replace(new RegExp('(^'+query+'|\\s'+query+'|\\s'+query+'$)','gi'),'');
}
function removeItemClass(ele, id) {
  removeClass(ele, 'i'+id);
}
function hasClass(ele, query) {
  return getclassReg(query).test(ele.className);
}
function getclassReg(query) {
  return new RegExp('(^'+query+'\\s|\\s'+query+'\\s|\\s'+query+'$)','gi');
}

window.onload = showFont;
// document.querySelector('.reset').addEventListener('click', showFont, false);