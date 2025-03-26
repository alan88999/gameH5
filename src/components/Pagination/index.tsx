import { useState } from 'react';
import styles from './index.module.less';
import { reactClassNameJoin } from '@/utils';

interface Props {
  total: number;
  page: {
    page: number;
    size: number;
  };
  onChange: (val: any) => void;
}

const Pagination = (props: Props) => {
  const { total, page, onChange } = props;
  const totalPage = Math.ceil(total / (page.size || 0));
  return (
    <div className={styles.container}>
      <div
        className={reactClassNameJoin(styles.pageBtn, styles.first)}
        onClick={() => {
          onChange({
            ...page,
            page: 0,
          });
        }}>
        {`<<`}
      </div>
      <div
        className={reactClassNameJoin(styles.pageBtn, styles.prev)}
        onClick={() => {
          onChange({
            ...page,
            page: page.page - 1 < 0 ? 0 : page.page - 1,
          });
        }}>
        {`<`}
      </div>
      <div className={styles.pageText}>{`${page.page + 1}/${totalPage}`}</div>
      <div
        className={reactClassNameJoin(styles.pageBtn, styles.next)}
        onClick={() => {
          onChange({
            ...page,
            page: page.page + 1 > totalPage ? totalPage : page.page + 1,
          });
        }}>
        {`>`}
      </div>
      <div
        className={reactClassNameJoin(styles.pageBtn, styles.last)}
        onClick={() => {
          onChange({
            ...page,
            page: totalPage - 1,
          });
        }}>
        {`>>`}
      </div>
    </div>
  );
};

export default Pagination;
