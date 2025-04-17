import { Modal } from 'antd-mobile';
import Button from '../button';
import { ModalProps } from 'antd-mobile';
import styles from './index.module.less';
import { reactClassNameJoin } from '@/utils';
import { useTranslation } from 'react-i18next';

interface Props extends ModalProps {
  content: any;
  contentDesc?: any;
  icon?: string;
  contentInnerClassName?: string;
  contentDescClassName?: string;
  footer?: {
    okText?: string;
    onOk?: () => void;
    cancelText?: string;
    onCancel?: () => void;
  };
}
const CustoModal = (props: Props) => {
  const {t} = useTranslation();
  const {
    footer,
    icon,
    content,
    contentInnerClassName,
    contentDescClassName,
    contentDesc,
    ...rest
  } = props;
  const {
    okText = t('confirm'),
    onOk,
    cancelText =   t('cancel'),
    onCancel,
  } = footer || {};
  return (
    <Modal
      className={styles.modal}
      content={
        <>
          {icon ? (
            <div className={styles.icon}>
              <img src={icon} />
            </div>
          ) : (
            ''
          )}
          <div className={styles.content}>
            <div
              className={reactClassNameJoin(
                styles.contentInner,
                contentInnerClassName,
              )}>
              {content}
            </div>
            {contentDesc ? (
              <div
                className={reactClassNameJoin(
                  styles.contentDesc,
                  contentDescClassName,
                )}>
                {contentDesc}
              </div>
            ) : (
              ''
            )}
          </div>

          {footer ? (
            <div className={styles.footer}>
              <Button className={styles.confirmBtn} onClick={onOk}>
                {okText}
              </Button>
              {cancelText ? (
                <Button
                  className={styles.cancelBtn}
                  type="cancel"
                  onClick={onCancel}>
                  {cancelText}
                </Button>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </>
      }
      {...rest}></Modal>
  );
};

export default CustoModal;
