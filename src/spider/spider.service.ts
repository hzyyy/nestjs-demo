import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import cheerio from 'cheerio'
// import * as cheerio from 'cheerio';

const request = require('request')
const path = require('path')
const fs = require('fs')

// 爬取外网，得用proxy，其中52841 端口号是来自Clash
const config: object = {
  proxy: 'http://127.0.0.1:50683',
};

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    // await axios.get('https://www.google.com/').then(res => {
    //   console.log(res.data)
    // })
    let num = 1
    while (num <= 1) {
      await this.loadImgs(num)
      num++
    }

    return `This action returns all spider`;
  }

  loadImgs(pageNum) {
    request({ ...config, url: 'https://v2ex.com/recent?p=' + pageNum }, (err: any, res: any, body: any) => {
      
      const $ = cheerio.load(body)

      const urls: string[] = [];
        $('#Main .box .item .avatar').each(function (index, item) {
        // console.log(this.attribs.src)
        // 获取图片的集合
        urls.push($(this).attr('src'))
      })
      console.log(urls);
      
      this.writeFile(urls)
    })
  }

  // 写入本地 生成实体文件
  writeFile(urls: string[]) {
    urls.forEach(async url => {
      // const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then( res => res.data );
      // const buffer = await request({ ...config, url: url }, (err: any, res: any, body: any) => body)
      await request({ ...config, url: url }, (err: any, res: any, body: any) => {
        console.log(body)
        return
      
        // 生成文件之前，先判断存放目录是否存在，否则会报错
        const target_path = path.join(__dirname, '../images/v2ex/');
        if (!fs.existsSync(target_path)) {
          fs.mkdirSync(target_path)
        }

        const ws = fs.createWriteStream(
          path.join(target_path, new Date().getTime() + '.png')
        );
        

        ws.write(body);
      })
      
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
