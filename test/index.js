import { expect } from 'chai';
import learningCI from '../learnCI';

describe('Let\'s learn CI', () => {

  it('should return the string I wrote', () => {
    expect(learningCI()).to.equal('Am I doing this right?');
  });

});
