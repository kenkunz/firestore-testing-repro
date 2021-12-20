import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc } from 'firebase/firestore';

describe('es6 module test', () => {
  it('should not throw error', async () => {
    const testEnv = await initializeTestEnvironment({});
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users/foobar'), { foo: 'bar' });
    });
    await testEnv.cleanup();
  });
});
