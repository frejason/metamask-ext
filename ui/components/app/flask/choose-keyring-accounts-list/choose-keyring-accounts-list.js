import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBox from '../../../ui/check-box';
import Identicon from '../../../ui/identicon';
import { getSnaps } from '../../../../selectors';
import Typography from '../../../ui/typography/typography';
import {
  COLORS,
  TYPOGRAPHY,
  FONT_WEIGHT,
  FLEX_DIRECTION,
  ALIGN_ITEMS,
  SIZES,
  BLOCK_SIZES,
} from '../../../../helpers/constants/design-system';
import Box from '../../../ui/box';
import { Icon, ICON_NAMES } from '../../../component-library/icon';

const ChooseKeyringAccountsList = ({
  accounts,
  selectedAccounts,
  handleAccountClick,
}) => {
  const selectedAccountScrollRef = useRef(null);
  useLayoutEffect(() => {
    selectedAccountScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const checkIfConflict = (accountObj) => {
    if (
      selectedAccounts[accountObj.namespace] &&
      Object.entries(selectedAccounts[accountObj.namespace]).some(
        ([snapId, snapAccounts]) =>
          snapId !== accountObj.snapId &&
          Object.values(snapAccounts).length > 0,
      )
    ) {
      return true;
    }
    return false;
  };

  const renderChainNameList = (chainNames) => {
    // address is essentially a seed for a blockie icon, in future iterations
    // the blockie will be replaced with the logos of various chains
    const list = chainNames.map((chainName, idx) => {
      return (
        <div
          key={`choose-keyring-accounts-list__account-chain-name-${idx}`}
          className="choose-keyring-accounts-list__account-chain-name-entry"
        >
          <Identicon diameter={20} address={`${chainName}-${idx}`} />
          <Typography
            className="choose-keyring-accounts-list__account-chain-name-text"
            color={COLORS.TEXT_DEFAULT}
            variant={TYPOGRAPHY.H6}
            fontWeight={FONT_WEIGHT.NORMAL}
            boxProps={{ paddingLeft: 2 }}
          >
            {chainName}
          </Typography>
        </div>
      );
    });
    return (
      <div className="choose-keyring-accounts-list__account-chain-names-wrapper">
        {list}
      </div>
    );
  };

  const snaps = useSelector(getSnaps);

  // TODO: add tooltip to show ChainId, add Icons, add chain count (IF past 3), add extra div to display chain names
  const List = () => {
    return (
      <div className="choose-keyring-accounts-list__wrapper">
        <div className="choose-keyring-accounts-list__list">
          {accounts.map((account, index) => {
            const { address, snapId, suggestedChainNames, namespace, caip10 } =
              account;
            const isSelectedAccount = Boolean(
              selectedAccounts[namespace]?.[snapId]?.[caip10],
            );
            const isConflict = checkIfConflict(account);
            const snap = snaps[snapId];
            return (
              <>
                <div
                  key={`choose-keyring-accounts-list-${index}`}
                  onClick={() => handleAccountClick(account, isConflict)}
                  className="choose-keyring-accounts-list__account"
                  ref={isSelectedAccount ? selectedAccountScrollRef : null}
                >
                  <div className="choose-keyring-accounts-list__account-info-wrapper">
                    <CheckBox
                      className="choose-keyring-accounts-list__list-check-box"
                      checked={isSelectedAccount}
                      disabled={isConflict}
                    />
                    <Identicon diameter={34} address={address} />
                    <div className="choose-keyring-accounts-list__account__info">
                      <Typography
                        variant={TYPOGRAPHY.H6}
                        color={COLORS.TEXT_DEFAULT}
                        className="choose-keyring-accounts-list__account__label"
                        boxProps={{ width: BLOCK_SIZES.HALF }}
                      >
                        {address}
                      </Typography>
                      <Box
                        flexDirection={FLEX_DIRECTION.ROW}
                        alignItems={ALIGN_ITEMS.CENTER}
                      >
                        <Typography
                          color={COLORS.TEXT_ALTERNATIVE}
                          variant={TYPOGRAPHY.H6}
                          fontWeight={FONT_WEIGHT.NORMAL}
                        >
                          via{' '}
                        </Typography>
                        <Icon
                          className="choose-keyring-accounts-list__account__icon"
                          key="snaps-mobile-filled"
                          name={ICON_NAMES.SNAPS_MOBILE_FILLED}
                          size={SIZES.SM}
                          color={COLORS.ICON_DEFAULT}
                        />
                        <Typography
                          className="choose-keyring-accounts-list__account__snap"
                          color={COLORS.TEXT_ALTERNATIVE}
                          variant={TYPOGRAPHY.H6}
                          fontWeight={FONT_WEIGHT.NORMAL}
                          boxProps={{ width: BLOCK_SIZES.HALF }}
                        >
                          {snap.manifest.proposedName}
                        </Typography>
                      </Box>
                    </div>
                  </div>
                </div>
                {isSelectedAccount &&
                  suggestedChainNames &&
                  renderChainNameList(suggestedChainNames)}
              </>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="choose-keyring-accounts-list">
      <List />
    </div>
  );
};

ChooseKeyringAccountsList.propTypes = {
  /**
   * Array of user account objects
   */
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      snapId: PropTypes.string,
      namespace: PropTypes.string,
      suggestedChainNames: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  /**
   * Currently selected accounts
   */
  selectedAccounts: PropTypes.object.isRequired,
  /**
   * Function to handle account click
   */
  handleAccountClick: PropTypes.func.isRequired,
};

export default ChooseKeyringAccountsList;
