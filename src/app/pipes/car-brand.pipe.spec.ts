import { CarBrandPipe } from './car-brand.pipe';

describe('CarBrandPipe', () => {
  it('create an instance', () => {
    const pipe = new CarBrandPipe();
    expect(pipe).toBeTruthy();
  });
});
