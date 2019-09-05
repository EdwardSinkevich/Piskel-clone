import ExportResults from './ExportResults';

describe('ExportResults.constructor', () => {
  it('Should assign this.frames to animationPreview.frames', () => {
    const animationPreview = {
      frames: 42,
    };
    const exportResults = new ExportResults(animationPreview);
    expect(exportResults.frames).toEqual(animationPreview.frames);
  });
});
