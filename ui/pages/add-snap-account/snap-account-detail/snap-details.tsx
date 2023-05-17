import React from 'react';

import Box from '../../../components/ui/box/box';
import { SnapDetails } from '../snap-account';
import {
  BLOCK_SIZES,
  DISPLAY,
  FLEX_DIRECTION,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import {
  BUTTON_VARIANT,
  Button,
  Tag,
  Text,
} from '../../../components/component-library';
import { useI18nContext } from '../../../hooks/useI18nContext';
import Identicon from '../../../components/ui/identicon/identicon.component';
import Detail from './detail';
import { SnapDetailHeader } from './header';

const SnapDetailsPage = () => {
  const t = useI18nContext();

  // TODO: replace with data from redux

  const snapDetail = {
    id: 'mockSnapId',
    iconUrl: '',
    snapTitle: 'Metamask TSS',
    snapSlug: 'Secure your account with MetaMask Mobile',
    snapDescription:
      'Threshold signature schemes (TSS) allow multiple collaborating participants to sign a message or transaction. The private key is shared between the participants using a technique called multi-party computation (MPC) which ensures that the entire private key is never exposed to any participant; the process for generating key shares is called distributed key generation (DKG). Before a signature can be generated all participants must generate key shares using DKG and store their key shares securely; the number of participants and threshold for signature generation must be decided in advance. Unlike other techniques such as Shamirs Secret Sharing (SSS) the entire private key is never revealed to any single participant and is therefore more secure as it does not have the trusted dealer problem.',
    tags: ['MPC', 'Shared Custody'],
    developer: 'Metamask',
    website: 'https://tss.ac/',
    auditUrls: ['auditUrl1', 'auditUrl2'],
    version: '1.0.0',
    lastUpdated: 'April 20, 2023',
    updateAvailable: true,
    isInstalled: true,
  };
  return (
    <Box
      display={DISPLAY.FLEX}
      flexDirection={FLEX_DIRECTION.COLUMN}
      padding={[10, 10, 10, 10]}
      className="snap-details-page"
    >
      <SnapDetailHeader {...snapDetail} />
      <Box display={DISPLAY.FLEX}>
        <Box
          width={BLOCK_SIZES.FOUR_FIFTHS}
          display={DISPLAY.FLEX}
          flexDirection={FLEX_DIRECTION.COLUMN}
        >
          <Text
            variant={TextVariant.bodyMdBold}
            marginBottom={2}
            color={TextColor.textAlternative}
          >
            {snapDetail.snapSlug}
          </Text>
          <Text variant={TextVariant.bodyMd} color={TextColor.textAlternative}>
            {snapDetail.snapDescription}
          </Text>
        </Box>
        <Box
          width={BLOCK_SIZES.ONE_FIFTH}
          display={DISPLAY.FLEX}
          flexDirection={FLEX_DIRECTION.COLUMN}
          paddingLeft={4}
        >
          <Detail title={t('snapDetailTags')}>
            {snapDetail.tags.map((tag, index) => {
              return (
                <Tag
                  label={tag}
                  labelProps={{}}
                  className=""
                  key={`tag-${index}`}
                  marginRight={1}
                />
              );
            })}
          </Detail>
          <Detail title={t('snapDetailDeveloper')}>
            <Text variant={TextVariant.bodyMd}>{snapDetail.developer}</Text>
          </Detail>
          <Detail title={t('snapDetailWebsite')}>{snapDetail.website}</Detail>
          <Detail title={t('snapDetailAudits')}>
            {snapDetail.auditUrls.map((auditLink, index) => {
              return (
                <Text key={`audit-link-${index}`}>
                  <Button variant={BUTTON_VARIANT.LINK} href={auditLink}>
                    {auditLink}
                  </Button>
                </Text>
              );
            })}
          </Detail>
          <Detail title={t('snapDetailVersion')}>
            <Text variant={TextVariant.bodyMd}>{snapDetail.version}</Text>
          </Detail>
          <Detail title={t('snapDetailLastUpdated')}>
            <Text variant={TextVariant.bodyMd}>{snapDetail.lastUpdated}</Text>
          </Detail>
          {snapDetail.isInstalled && (
            <Box>
              <Button variant={BUTTON_VARIANT.LINK}>
                {t('snapDetailManageSnap')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SnapDetailsPage;
