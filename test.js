import main from './lib/index';
import assert from 'assert';

describe('stub', () => {
	it('should return "stub"', () => {
		const result = main.stub();
		assert.equal(result, 'stub');
	});
});