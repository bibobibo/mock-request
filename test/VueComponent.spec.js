import {spy, stub, mock} from 'sinon'
import assert from 'assert'
import Vue from '../src/Vue';

import VueComponent from '../src/VueComponent';


describe('VueComponent', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = spy(console, 'log');
  })

  afterEach(() => {
    logSpy.restore();
  })

  it('这是一个真的去发请求来实现的测试用例', (done) => {
    const componentInstance = new VueComponent();
    componentInstance.render();

    setTimeout(function(){
      assert(logSpy.calledTwice);

      assert.equal(logSpy.firstCall.args[0], '即将使用数据发送请求：');
      assert.equal(logSpy.firstCall.args[1], '这是请求数据');
      assert.equal(logSpy.secondCall.args[0], '这是后台成功返回的数据');
      done();
    }, 1500)
  })

  describe('下面展示如何模拟异步请求', () => {
    let oldRequest;

    before('将请求发送换成假的', () => {
      oldRequest = Vue.prototype.$request;

      const newRequest = {
        post: function(data, success, error) {
          success('这是模拟的后台成功返回数据')
        }
      }

      Vue.prototype.$request = newRequest;
    })

    after('将旧的请求处理函数恢复', () => {
      Vue.prototype.$request = oldRequest;
    })

    it('这是个模拟异步请求返回成功的用例', () => {
      const componentInstance = new VueComponent();
      componentInstance.render();
  
      assert(logSpy.calledTwice);
      assert.equal(logSpy.firstCall.args[0], '即将使用数据发送请求：');
      assert.equal(logSpy.firstCall.args[1], '这是请求数据');
      assert.equal(logSpy.secondCall.args[0], '这是模拟的后台成功返回数据');
    })
  })
});
