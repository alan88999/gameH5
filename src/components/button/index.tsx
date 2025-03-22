import * as React from 'react';
// static source
// utils
import { reactClassNameJoin } from '@/utils';
// styles
import styles from './index.module.less';
interface ButtonPropsType {
  type?: 'confirm' | 'cancel';
  buttonType?: 'submit' | 'reset' | 'button';
  onClick?: (options?: any) => any;
  disabled?: boolean;
  children: any;
  className?: any;
  loading?: boolean;
  disabledStyle?: boolean; // 显示禁用样式
  icon?: string;
  [random: string]: any;
}

interface ButtonStateType {
  [random: string]: any;
}

class Button extends React.PureComponent<ButtonPropsType, ButtonStateType> {
  public static defaultProps = {
    type: 'confirm',
    onClick: () => null,
    disabled: false,
    children: null,
    buttonType: 'submit',
    className: '',
    loading: false,
    disabledStyle: false,
    icon: '',
  };
  public render() {
    const {
      props: {
        type,
        onClick,
        disabled,
        children,
        className,
        loading,
        block,
        buttonType,
        disabledStyle,
        icon,
      },
    } = this;
    const isDisabled = loading || disabled;
    return (
      <button
        className={reactClassNameJoin(
          styles.buttonView,
          type === 'confirm' ? styles.buttonConfirmView : '',
          type === 'cancel' ? styles.buttonCancelView : '',
          block ? styles.buttonBlockView : '',
          isDisabled || disabledStyle ? styles.buttonDisabledView : '',
          className,
        )}
        type={buttonType}
        disabled={isDisabled}
        onClick={() => {
          onClick && onClick();
        }}>
        {loading ? (
          <img className={styles.loading} src={require('./img/loading.png')} alt={'loading'} />
        ) : icon ? (
          <img className={styles.icon}  src={icon}alt={'icon'} />
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
}

export default Button;
