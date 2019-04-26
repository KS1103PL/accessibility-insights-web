// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';

import { FlaggedComponent } from '../../../../../common/components/flagged-component';
import { FeatureFlags } from '../../../../../common/feature-flags';
import { NamedSFC } from '../../../../../common/react/named-sfc';
import { IssueFilingSettingsContainer } from '../../../../../issue-filing/components/issue-filing-settings-container';
import { SettingsProps } from '../settings-props';
import { GitHubIssueSettingsUx } from './github-issue-settings-ux';

export const IssueFilingSettings = NamedSFC<SettingsProps>('IssueFilingSettings', props => {
    const getNewIssueFilingSettingsUx = () => {
        const { deps, userConfigurationStoreState } = props;
        const { issueFilingServiceProvider, userConfigMessageCreator } = deps;
        const selectedIssueFilingService = issueFilingServiceProvider.forKey(userConfigurationStoreState.bugService);
        const selectedIssueFilingServiceData = selectedIssueFilingService.getSettingsFromStoreData(
            userConfigurationStoreState.bugServicePropertiesMap,
        );
        return (
            <IssueFilingSettingsContainer
                deps={deps}
                selectedIssueFilingService={selectedIssueFilingService}
                selectedIssueFilingServiceData={selectedIssueFilingServiceData}
                onPropertyUpdateCallback={userConfigMessageCreator.setIssueFilingServiceProperty}
                onSelectedServiceChange={userConfigMessageCreator.setIssueFilingService}
            />
        );
    };

    const getGitHubIssueSettingsUx = () => {
        return <GitHubIssueSettingsUx {...props} />;
    };

    return (
        <>
            <h3>Issue filing</h3>
            <FlaggedComponent
                enableJSXElement={getNewIssueFilingSettingsUx()}
                disableJSXElement={getGitHubIssueSettingsUx()}
                featureFlag={FeatureFlags[FeatureFlags.newIssueFilingExperience]}
                featureFlagStoreData={props.featureFlagData}
            />
        </>
    );
});