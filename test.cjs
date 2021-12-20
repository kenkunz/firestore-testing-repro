const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');
const { doc, setDoc } = require('firebase/firestore');

describe('cjs require test', () => {
  it('should not throw error', async () => {
    const testEnv = await initializeTestEnvironment({});
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users/foobar'), { foo: 'bar' });
    });
    await testEnv.cleanup();
  });
});
