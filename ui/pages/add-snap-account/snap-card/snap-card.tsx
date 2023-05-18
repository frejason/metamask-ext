import React, { useState } from 'react';
import Box from '../../../components/ui/box/box';
import {
  BUTTON_VARIANT,
  Button,
  Icon,
  IconName,
  Text,
} from '../../../components/component-library';
import { SnapCardProps } from '../snap-account/snap-account';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  AlignItems,
  BackgroundColor,
  BorderColor,
  BorderRadius,
  Color,
  DISPLAY,
  FLEX_DIRECTION,
  IconColor,
  JustifyContent,
  TextVariant,
} from '../../../helpers/constants/design-system';
import ConfigureSnapPopup from '../../../components/app/configure-snap-popup';

export default function SnapCard({
  iconUrl,
  snapTitle,
  snapSlug,
  updateAvailable,
  isInstalled,
  website,
  onClickFunc,
}: Pick<
  SnapCardProps,
  | 'iconUrl'
  | 'snapTitle'
  | 'snapSlug'
  | 'updateAvailable'
  | 'isInstalled'
  | 'website'
> & { onClickFunc: () => void }) {
  const t = useI18nContext();
  const [showConfigPopover, setShowConfigPopover] = useState(false);

  return (
    <Box
      display={DISPLAY.FLEX}
      flexDirection={FLEX_DIRECTION.COLUMN}
      backgroundColor={BackgroundColor.backgroundDefault}
      borderColor={BorderColor.borderMuted}
      borderRadius={BorderRadius.SM}
      borderWidth={1}
      padding={[4, 4, 4, 4]}
    >
      <Box
        display={DISPLAY.FLEX}
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
        marginBottom={2}
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
        {isInstalled ? (
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => setShowConfigPopover(true)}
          >
            {t('snapConfigure')}
          </Button>
        ) : (
          <Button variant={BUTTON_VARIANT.SECONDARY}>{t('install')}</Button>
        )}
      </Box>
      <Text
        variant={TextVariant.bodySm}
        color={Color.textAlternative}
        marginBottom={2}
      >
        {snapTitle}
      </Text>
      <Text variant={TextVariant.headingMd} marginBottom="auto">
        {snapSlug}
      </Text>

      <Box display={DISPLAY.FLEX} justifyContent={JustifyContent.spaceBetween}>
        {updateAvailable && (
          <Text variant={TextVariant.bodySm} color={Color.textAlternative}>
            {t('snapUpdateAvailable')}
          </Text>
        )}
        <Icon
          name={IconName.Arrow2Right}
          color={IconColor.iconAlternative}
          onClick={onClickFunc}
          marginLeft="auto"
        />
      </Box>
      {showConfigPopover && (
        <ConfigureSnapPopup
          onClose={() => setShowConfigPopover(false)}
          link={website}
        />
      )}
    </Box>
  );
}
