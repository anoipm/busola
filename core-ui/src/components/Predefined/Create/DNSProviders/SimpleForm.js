import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormFieldset, FormLabel, FormTextarea } from 'fundamental-react';
import { K8sNameInput } from 'react-shared';
import { CreateForm } from 'shared/components/CreateForm/CreateForm';
import { LabelsInput } from 'components/Lambdas/components';
import { SecretRef } from 'shared/components/ResourceRef/SecretRef';

export function SimpleForm({ dnsProvider, setDNSProvider }) {
  const { t, i18n } = useTranslation();

  return (
    <CreateForm.Section>
      <FormFieldset>
        <CreateForm.FormField
          label={<FormLabel required>{t('common.labels.name')}</FormLabel>}
          input={
            <K8sNameInput
              showLabel={false}
              compact
              kind="DNSProvider"
              onChange={e =>
                setDNSProvider({ ...dnsProvider, name: e.target.value })
              }
              value={dnsProvider.name}
              i18n={i18n}
            />
          }
        />
        <CreateForm.FormField
          label={<FormLabel>{t('common.headers.labels')}</FormLabel>}
          input={
            <LabelsInput
              showFormLabel={false}
              labels={dnsProvider.labels}
              onChange={labels => setDNSProvider({ ...dnsProvider, labels })}
              i18n={i18n}
              compact
            />
          }
        />
        <CreateForm.FormField
          label={<FormLabel>Secret Reference</FormLabel>}
          required
          input={
            <SecretRef
              id="secret-ref-input"
              resourceRef={dnsProvider.secretRef}
              onChange={(_, secretRef) =>
                setDNSProvider({ ...dnsProvider, secretRef })
              }
            />
          }
        />
        <CreateForm.FormField
          label={<FormLabel>Include Domains</FormLabel>}
          required
          input={
            <FormTextarea
              compact
              className="resize-vertical"
              onChange={e =>
                setDNSProvider({
                  ...dnsProvider,
                  domains: {
                    ...dnsProvider.domains,
                    include: e.target.value.split('\n'),
                  },
                })
              }
              value={dnsProvider.domains?.include?.join('\n') || ''}
              placeholder="Domains that should be observed, one per line"
            />
          }
        />
      </FormFieldset>
    </CreateForm.Section>
  );
}