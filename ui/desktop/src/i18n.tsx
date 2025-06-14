import { FluentBundle, FluentResource } from '@fluent/bundle';
import { LocalizationProvider, ReactLocalization } from '@fluent/react';
import React from 'react';

import agentHeaderEn from './components/AgentHeader.en.ftl?raw';
import apiKeyWarningEn from './components/ApiKeyWarning.en.ftl?raw';

const bundle = new FluentBundle('en-US');
bundle.addResource(new FluentResource(agentHeaderEn));
bundle.addResource(new FluentResource(apiKeyWarningEn));

export const l10n = new ReactLocalization([bundle]);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LocalizationProvider l10n={l10n}>{children}</LocalizationProvider>
);
