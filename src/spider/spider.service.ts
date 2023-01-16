import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
// import axios from 'axios';
const request = require('request');
import cheerio from 'cheerio'

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    // await axios.get('https://www.google.com/').then(res => {
    //   console.log(res.data)
    // })
    const config: object = {
      url: 'https://v2ex.com/recent?p=1',
      proxy: 'http://127.0.0.1:52841',
    };

    // 爬取外网，得用proxy，其中52841 端口号是来自Clash
    await request(config, (err: any, res: any, body: any) => {
      const $ = cheerio.load(body)
      const urls: string[] = [];
      const imgs = $('#Main .box .item .avatar').each(function(index, item) {
        console.log(this.attribs.src)
        urls.push($(this).attr('src'))
      })
      
      // console.log(imgs);
    })
    console.log(2)
    return `This action returns all spider`;
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
