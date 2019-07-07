import React, { Component } from 'react';
import { Input } from 'antd';
import { getFileContent, mkdirs, downloadPic } from '../tools/tools';

let fs = require('fs');
let request = require('request');
let Bagpipe = require('bagpipe');
let bagpipe = new Bagpipe(1000);

export default class Home extends Component {
  static propTypes = {};

  downloadData() {
    let fileUploadControl = document.getElementById('fileUpload');
    let filePath = fileUploadControl.files[0].path;
    let content = getFileContent(filePath);
    let jsons = JSON.parse(content);

    for (let i = 0; i < jsons.length; i++) {
      let json = jsons[i];
      let dateNow = new Date();
      let baseUrl = './data/' + dateNow.format('yyyyMMddhhmmssS' + i);

      //创建文件夹
      if (!fs.existsSync(baseUrl)) {
        mkdirs(baseUrl, function(error) {
          if (error) {
            console.log('创建文件夹失败:' + JSON.stringify(error));
          } else {
            //创建文本
            let content = json.taskText;
            fs.writeFile(baseUrl + '/content.txt', content, 'utf8', function(error) {
              if (error) {
                console.log('文本写入失败' + JSON.stringify(error));
              }
            });

            let images = json.screenshot.split(',');

            for (let k = 0; k < images.length; k++) {
              bagpipe.push(downloadPic, images[k], baseUrl + '/' + k + '.png', function(err, data) {
                  if(err){
                    console.log('图片下载失败')
                  }
              });
            }
          }
        });
      }
    }

  }


  render() {
    return (
      <div>
        <Input style={{ width: 300 }} type="file" id="fileUpload" onChange={this.downloadData}/>
      </div>
    );
  }

}
