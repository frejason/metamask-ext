import React, { useState } from 'react';
import Box from '../../../components/ui/box/box';
import {
  AlignItems,
  BackgroundColor,
  BorderColor,
  DISPLAY,
  FLEX_DIRECTION,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import {
  Text,
  Button,
  Tag,
  BUTTON_VARIANT,
  Icon,
  IconName,
} from '../../../components/component-library';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { SnapCardProps } from '../snap-account/snap-account';
import ConfigureSnapPopup from '../../../components/app/configure-snap-popup/configure-snap-popup';

export const SnapDetailHeader = ({
  updateAvailable,
  snapTitle,
  isInstalled,
  iconUrl,
  developer,
  auditUrls,
  website,
}: Pick<
  SnapCardProps,
  | 'updateAvailable'
  | 'snapTitle'
  | 'isInstalled'
  | 'iconUrl'
  | 'developer'
  | 'auditUrls'
  | 'website'
>) => {
  const t = useI18nContext();
  const [showConfigPopover, setShowConfigPopover] = useState(false);

  return (
    <>
      <Box marginBottom={5}>
        <Box alignItems={AlignItems.center} marginBottom={4}>
          <Button
            variant={BUTTON_VARIANT.LINK}
            marginRight={4}
            onClick={() => history.back()}
          >
            {t('snapDetailsCreateASnapAccount')}
          </Button>
          <Icon name={IconName.ArrowRight} marginRight={4} />
          <Text>{snapTitle}</Text>
        </Box>
        <Box justifyContent={JustifyContent.spaceBetween}>
          <Box
            display={DISPLAY.FLEX}
            flexDirection={FLEX_DIRECTION.ROW}
            alignItems={AlignItems.center}
          >
            <Text variant={TextVariant.headingLg} marginRight={1}>
              {snapTitle}
            </Text>
            {isInstalled && (
              <Tag
                label={t('snapDetailsInstalled')}
                labelProps={{
                  color: TextColor.textAlternative,
                }}
                className=""
                height={2}
              />
            )}
          </Box>
          <Box>
            {isInstalled && updateAvailable && (
              <Button variant={BUTTON_VARIANT.PRIMARY} marginRight={1}>
                {t('snapUpdateAvailable')}
              </Button>
            )}
            {isInstalled && (
              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                onClick={() => setShowConfigPopover(true)}
              >
                {t('snapConfigure')}
              </Button>
            )}
            {!isInstalled && (
              <Button variant={BUTTON_VARIANT.PRIMARY}>
                {t('snapInstall')}
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display={DISPLAY.FLEX}
          flexDirection={FLEX_DIRECTION.ROW}
          alignItems={AlignItems.center}
        >
          <Box
            display={DISPLAY.FLEX}
            justifyContent={JustifyContent.center}
            alignItems={AlignItems.center}
            style={{
              borderRadius: '50%',
              height: '32px',
              width: '32px',
            }}
            borderWidth={1}
            borderColor={BorderColor.borderMuted}
            padding={[2, 2, 2, 2]}
            marginRight={1}
          >
            <img src={iconUrl} className="snap-detail-icon" />
          </Box>
          {developer === 'Metamask' && (
            <Tag
              color={TextColor.infoDefault}
              backgroundColor={BackgroundColor.infoMuted}
              borderColor={BackgroundColor.infoMuted}
              label={
                <Box
                  display={DISPLAY.FLEX}
                  justifyContent={JustifyContent.center}
                  alignItems={AlignItems.center}
                >
                  <Icon name={IconName.Star} />{' '}
                  <Text
                    color={TextColor.infoDefault}
                    variant={TextVariant.bodySm}
                  >
                    {t('snapCreatedByMetaMask')}
                  </Text>
                </Box>
              }
              labelProps={{
                color: TextColor.infoDefault,
              }}
              className=""
              marginRight={1}
            />
          )}
          {auditUrls.length > 0 && (
            <Tag
              color={TextColor.infoDefault}
              backgroundColor={BackgroundColor.infoMuted}
              borderColor={BackgroundColor.infoMuted}
              label={
                <Box
                  display={DISPLAY.FLEX}
                  justifyContent={JustifyContent.center}
                  alignItems={AlignItems.center}
                >
                  <Icon name={IconName.Star} />{' '}
                  <Text
                    color={TextColor.infoDefault}
                    variant={TextVariant.bodySm}
                  >
                    {t('snapIsAudited')}
                  </Text>
                </Box>
              }
              labelProps={{
                color: TextColor.infoDefault,
              }}
              className=""
            />
          )}
        </Box>
      </Box>
      {showConfigPopover && (
        <ConfigureSnapPopup
          onClose={() => setShowConfigPopover(false)}
          link={website}
        />
      )}
    </>
  );
};
