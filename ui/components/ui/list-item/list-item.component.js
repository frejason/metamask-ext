import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function ListItem({
  title,
  subtitle,
  onClick,
  children,
  titleIcon,
  icon,
  rightContent,
  midContent,
  className,
  showBorder,
  'data-testid': dataTestId,
}) {
  const primaryClassName = classnames(
    'list-item',
    className,
    subtitle || children ? '' : 'list-item--single-content-row',
    {
      'list-item-border': !showBorder,
    },
  );

  return (
    <div
      className={primaryClassName}
      onClick={onClick}
      data-testid={dataTestId}
      role="button"
      tabIndex={0}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
    >
      {icon ? <div className="list-item__icon">{icon}</div> : null}
      <div className="list-item__heading">
        {React.isValidElement(title) ? (
          title
        ) : (
          <h2 className="list-item__title">{title}</h2>
        )}
        {titleIcon && (
          <div className="list-item__heading-wrap">{titleIcon}</div>
        )}
      </div>
      {subtitle ? (
        <div className="list-item__subheading">{subtitle}</div>
      ) : null}
      {children ? <div className="list-item__actions">{children}</div> : null}
      {midContent ? (
        <div className="list-item__mid-content">{midContent}</div>
      ) : null}
      {rightContent ? (
        <div className="list-item__right-content">{rightContent}</div>
      ) : null}
    </div>
  );
}

ListItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleIcon: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.node,
  rightContent: PropTypes.node,
  midContent: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  showBorder: PropTypes.bool,
  'data-testid': PropTypes.string,
};
