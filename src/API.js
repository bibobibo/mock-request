import Vue from './Vue';

const post = function(data, success, error) {
  setTimeout(function() {
    const random = Math.random();

    if(random <= 0.99) {
      success('这是后台成功返回的数据')
    }else{
      error('这是后台失败返回的数据')
    }
  }, 1000)
}

Vue.prototype.$request = {
  post: post
};
