import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import { componentColors } from '../CmtHelpers/JssHelper';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Badge from '@mui/material/Badge';
import useStyles from './index.style';

const RenderTooltip = ({ enableTooltip, tooltipProps, item, children }) => {
  const tooltipShow = item.tooltip ? true : enableTooltip;
  const tooltipText = item.tooltip ? item.tooltip : item.name;

  return tooltipShow && tooltipText ? (
    <Tooltip title={tooltipText} aria-label={tooltipText} arrow {...(item.tooltipProps ? item.tooltipProps : tooltipProps)}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

const RenderDefaultButton = ({
  size,
  alt,
  colorClass,
  variant,
  itemProps,
  enableTooltip,
  tooltipProps,
  item,
  handleOnButtonClick,
}) => {
  return (
    <RenderTooltip item={item} enableTooltip={enableTooltip} tooltipProps={tooltipProps}>
      <Button
        startIcon={alt ? item.altIcon : item.icon}
        className={colorClass}
        onClick={handleOnButtonClick}
        variant={item.variant ? item.variant : variant}
        size={item.size ? item.size : size}
        {...(item.itemProps ? item.itemProps : itemProps)}>
        {item.name}
      </Button>
    </RenderTooltip>
  );
};

const RenderIconButton = ({
  size,
  selected,
  alt,
  colorClass,
  itemProps,
  enableTooltip,
  tooltipProps,
  item,
  handleOnButtonClick,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <RenderTooltip item={item} enableTooltip={enableTooltip} tooltipProps={tooltipProps}>
        {selected ? (
          <IconButton
            className={colorClass}
            aria-label={item.name}
            onClick={handleOnButtonClick}
            size={'medium'}
            {...(item.itemProps ? item.itemProps : itemProps)}>
            {alt ? item.altIcon : item.icon}
            <Badge badgeContent={'X'} color="primary" variant="string" sx={{ pb: 4, pl: 0.5 }}></Badge>
          </IconButton>
        ) : (
          <IconButton
            className={colorClass}
            aria-label={item.name}
            onClick={handleOnButtonClick}
            size={'medium'}
            {...(item.itemProps ? item.itemProps : itemProps)}>
            {alt ? item.altIcon : item.icon}
          </IconButton>
        )}
      </RenderTooltip>
      {item.name && (
        <Box mt={2} className={clsx(classes.labelRoot, 'Cmt-Buttons-label')}>
          {item.name}
        </Box>
      )}
    </React.Fragment>
  );
};

const buttonTypes = {
  default: RenderDefaultButton,
  'icon-button': RenderIconButton,
};

const getWrapperProps = (buttonType, size) => {
  if (buttonType === 'icon-button') {
    return {
      minWidth: size === 'small' ? 54 : 60,
    };
  }
};

const RenderButton = ({
  type,
  selected,
  alt,
  size,
  color,
  variant,
  onItemClick,
  itemProps,
  enableTooltip,
  tooltipProps,
  item,
}) => {
  const classes = useStyles();
  const buttonColor = item.color ? item.color : color;
  const colorClass = buttonColor && classes[buttonColor] ? classes[buttonColor] : '';
  const buttonType = item.type ? item.type : type;

  const handleOnButtonClick = () => {
    if (item.onClick) {
      item.onClick(item);
    } else if (onItemClick) {
      onItemClick(item);
    }
  };

  const wrapperProps = getWrapperProps(buttonType, size);
  const RequestedButton = buttonTypes[buttonType];

  return (
    <Box mr={2} mb={2} {...wrapperProps} className={clsx(classes.buttonRoot, 'CmtButtons-wrapper')}>
      <RequestedButton
        {...{
          size,
          selected,
          colorClass,
          variant,
          selected,
          alt,
          handleOnButtonClick,
          itemProps,
          enableTooltip,
          tooltipProps,
          item,
        }}
      />
    </Box>
  );
};

const CmtButtons = ({
  items,
  type,
  size,
  color,
  variant,
  onItemClick,
  itemProps,
  enableTooltip,
  tooltipProps,
  className,
  selected,
  alt,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      {items.map((item, index) => (
        <RenderButton
          key={index}
          index={index}
          item={item}
          {...{
            type,
            selected,
            alt,
            size,
            color,
            variant,
            onItemClick,
            itemProps,
            enableTooltip,
            tooltipProps,
          }}
        />
      ))}
    </Box>
  );
};

CmtButtons.prototype = {
  items: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['default', 'icon-button']),
  itemProps: PropTypes.object,
  onItemClick: PropTypes.func,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(componentColors),
  enableTooltip: PropTypes.bool,
  tooltipProps: PropTypes.object,
};

CmtButtons.defaultProps = {
  items: [], // format: [{icon: "text or node", label: "button name", onClick: functionHandler, tooltip, ...}]
  type: 'default',
  variant: 'text',
  size: 'medium',
  color: '',
  enableTooltip: false,
};

export default CmtButtons;
