import React from 'react';
import cx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@mui-treasury/styling';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import createStyles from './MenuToggle.styles';

const MenuToggle = withStyles(createStyles, { name: 'MenuToggle' })(props => {
  const {
    css,
    component: Component,
    menuComponent,
    className,
    label,
    selected,
    expanded,
    toggle,
    toggleSeparated = toggle,
    renderToggle,
    onMenuClick,
    onToggle,
    ListItemProps,
  } = props;
  const similarListItemProps = {
    // don't need to pass selected to ListItem
    // cause we have full control from upper div
    className: css.menuItem,
    component: menuComponent || 'div',
    button: true,
    ...ListItemProps,
  };
  return (
    <Component
      className={cx(
        css.itemRoot,
        (toggleSeparated || toggle) && css.itemRootNesting,
        selected && css.itemRootSelected,
        expanded && css.itemRootExpanded,
        className
      )}
    >
      {toggleSeparated ? (
        <>
          <ListItem {...similarListItemProps} onClick={onMenuClick}>
            {label}
          </ListItem>
          {toggle && (
            <ButtonBase className={css.toggleBtn} onClick={onToggle}>
              {renderToggle({ expanded, className: css.toggleContent })}
            </ButtonBase>
          )}
        </>
      ) : (
        <ListItem
          {...similarListItemProps}
          onClick={e => {
            onToggle(e);
            onMenuClick(e);
          }}
        >
          {label}{' '}
          {toggle && renderToggle({ expanded, className: css.menuItemToggle })}
        </ListItem>
      )}
    </Component>
  );
});

MenuToggle.propTypes = {
  component: PropTypes.elementType,
  menuComponent: PropTypes.elementType,
  label: PropTypes.string,
  selected: PropTypes.bool,
  expanded: PropTypes.bool,
  toggleSeparated: PropTypes.bool,
  toggle: PropTypes.bool,
  onMenuClick: PropTypes.func,
  onToggle: PropTypes.func,
  renderToggle: PropTypes.func,
  ListItemProps: PropTypes.shape({}),
};
MenuToggle.defaultProps = {
  component: 'li',
  menuComponent: undefined,
  label: '',
  selected: false,
  expanded: false,
  toggle: false,
  toggleSeparated: undefined,
  onMenuClick: () => {},
  onToggle: () => {},
  renderToggle: () => null,
  ListItemProps: {},
};

export default MenuToggle;
