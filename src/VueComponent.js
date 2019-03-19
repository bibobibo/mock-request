import Vue from './Vue';
import './API';

class VueComponent extends Vue{
  render() {
    const data = '这是请求数据';

    console.log("即将使用数据发送请求：", data);
    this.$request.post(data, function(response) {
      console.log(response)
    }, function(error) {
      console.log(error)
    });
  }
}

export default VueComponent;
