import { UrlValidationPipe } from './url-validation.pipe';

describe('UrlValidationPipe', () => {
  const pipe = new UrlValidationPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null with null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('returns null with anything other than a string input', () => {
    expect(pipe.transform(1)).toBeNull();
    expect(pipe.transform({})).toBeNull();
    expect(pipe.transform([])).toBeNull();
    expect(pipe.transform(() => null)).toBeNull();
    expect(pipe.transform(true)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('returns false with malformed string url', () => {
    expect(pipe.transform('some//url')).toBeFalsy();
    expect(pipe.transform('some string')).toBeFalsy();
    expect(pipe.transform('http:/not-good')).toBeFalsy();
  });

  it('returns true for protocol://whatever', () => {
    expect(pipe.transform('http://domain.com')).toBeTruthy();
    expect(pipe.transform('https://something')).toBeTruthy();
  });
});
