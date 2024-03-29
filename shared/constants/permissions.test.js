import { endowmentPermissionBuilders } from '@metamask/snaps-controllers';
import { restrictedMethodPermissionBuilders } from '@metamask/rpc-methods';
import {
  EndowmentPermissions,
  ExcludedSnapEndowments,
  ExcludedSnapPermissions,
  RestrictedMethods,
} from './permissions';

describe('EndowmentPermissions', () => {
  it('has the expected permission keys', () => {
    // Since long-running is fenced out this causes problems with the test, we re-add it here.
    expect(Object.keys(EndowmentPermissions).sort()).toStrictEqual(
      [
        'endowment:long-running',
        ...Object.keys(endowmentPermissionBuilders).filter(
          (targetKey) =>
            !Object.keys(ExcludedSnapEndowments).includes(targetKey),
        ),
      ].sort(),
    );
  });
});

describe('RestrictedMethods', () => {
  it('has the expected permission keys', () => {
    expect(Object.keys(RestrictedMethods).sort()).toStrictEqual(
      [
        'eth_accounts',
        ...Object.keys(restrictedMethodPermissionBuilders).filter(
          (targetKey) =>
            !Object.keys(ExcludedSnapPermissions).includes(targetKey),
        ),
      ].sort(),
    );
  });
});
