import { i18n } from '@lingui/core';
import {
  Alert,
  Divider,
  List,
  ListItemButton,
  Radio,
  RadioRoot,
  Typography,
} from '@nikaru-dev/ui';
import React from 'react';

import { Layout, PageContainer } from '../components/Layout';
import { useLanguage } from '../hooks/useLanguage';

export function LanguagePage() {
  const { activeLanguage, changeLanguage, languages } = useLanguage();

  const languageList = languages.map((languageItem) => {
    const { local, label, SVGFlag } = languageItem;
    return {
      id: local,
      value: local,
      title: (
        <Typography variant="title" size="xmedium">
          {label}
        </Typography>
      ),
      onClick: () => changeLanguage(languageItem.local),
      end: <Radio value={local} />,
      start: <SVGFlag />,
    };
  });

  return (
    <Layout
      header={{
        title: i18n.t('Language'),
      }}>
      <PageContainer>
        <Alert
          type="warning"
          variant="alarm"
          title="Important Notice: Machine translations are in use"
        />
        <Divider size={'8'} />
        <RadioRoot value={activeLanguage}>
          <List
            type={
              <ListItemButton
                title={i18n.t('language')}
                id="_"
                onClick={() => console.log()}
              />
            }
            items={languageList}
          />
        </RadioRoot>
      </PageContainer>
    </Layout>
  );
}
