import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios, { AxiosProxyConfig } from 'axios';
import cheerio from 'cheerio';

const request = require('request');
const path = require('path');
const fs = require('fs');

// 爬取外网，得用proxy，其中2010 端口号是来自Clash
const proxyConfig: AxiosProxyConfig = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 2010,
};

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    let num = 1;
    while (num <= 1) {
      await this.loadImgs(num);
      num++;
    }

    return `This action returns all spider`;
  }

  async loadImgs(pageNum) {
    const urls: string[] = [];
    const body = await axios
      .get('https://v2ex.com/recent?p=' + pageNum, { proxy: proxyConfig })
      .then((res) => res.data)
      .catch((err) => err);
    const $ = cheerio.load(body);

    $('#Main .box .item .avatar').each(function (index, item) {
      // 获取图片的集合
      urls.push($(this).attr('src'));
    });

    this.writeFile(urls);
  }

  // 写入本地 生成实体文件
  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer', proxy: proxyConfig })
        .then((res) => res.data)
        .catch((err) => err);
      const target_path = path.join(__dirname, '../images/v2ex/');

      // 生成文件之前，先判断存放目录是否存在，否则会报错
      if (!fs.existsSync(target_path)) {
        fs.mkdirSync(target_path);
      }

      const ws = fs.createWriteStream(
        path.join(target_path, new Date().getTime() + '.png'),
      );

      ws.write(buffer);
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
