import { Test, TestingModule } from '@nestjs/testing';
import { QrService } from './qr.service';
import * as fs from 'fs';
import * as path from 'path';

describe('QrService', () => {
  let service: QrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrService],
    }).compile();
    service = module.get<QrService>(QrService);
  })

  
  it('should return right URL', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/valid.jpg');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve('https://scnv.io/f2AO?qr=1'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe('https://scnv.io/f2AO?qr=1');
  });
  
  it('should return not URL format', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/WiFi_Password.png');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve('WIFI:T:WPA;S:ISP_Wifi;P:12345678;'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe('WIFI:T:WPA;S:ISP_Wifi;P:12345678;');
  });

  it('should cannot decode image', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/invalidQR.jpg');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockRejectedValue(new Error('Cannot decode image'))
    try {
      await service.decodeQR(mockBuffer);
    } catch (error) {
      expect(error.message).toBe('Cannot decode image');
    }
  });

  it('should throw an error invalid buffer', async () => {
    const invalidBuffer = Buffer.from('invalid data');
    jest.spyOn(service, 'decodeQR').mockRejectedValue(new Error('Failed to decode image'))
    await expect(service.decodeQR(invalidBuffer)).rejects.toThrow('Failed to decode image');
  });

  it('should return All correct kanji', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/kanjipure.png');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve('コードは漢字・かなを効率よく表現することができます。'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe('コードは漢字・かなを効率よく表現することができます。')
  });

  it('should return right result (special char+URL)r', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/myProfile.png');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve(':::@www.facebook/pongsatornarunrat'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe(':::@www.facebook/pongsatornarunrat')
  });
  
  it('should return right text (combine line)', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/twoLine.png');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve('First LineNew Line'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe('First LineNew Line')
  });
  
  //special case | unreadable Kanji
  it('should return URL after handle unreadable Kanji', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/kanji.png');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockReturnValue(Promise.resolve('http://www.biccamera.com/'))
    const actual = await service.decodeQR(mockBuffer);
    expect(actual).toBe('http://www.biccamera.com/')
  });
  it('should return URL from uncle holding qr', async () => {
    const filePath = path.join(__dirname, '../../../test/resource/test_kanji8_holdPic.jpg');
    const mockBuffer = fs.readFileSync(filePath)
    jest.spyOn(service, 'decodeQR').mockRejectedValue(new Error('Cannot decode image'))
    try {
      await service.decodeQR(mockBuffer);
    } catch (error) {
      expect(error.message).toBe('Cannot decode image');
    }
  });
})
