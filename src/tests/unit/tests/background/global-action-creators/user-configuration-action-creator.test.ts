// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
    SaveIssueFilingSettingsPayload,
    SetHighContrastModePayload,
    SetIssueFilingServicePayload,
    SetIssueFilingServicePropertyPayload,
} from 'background/actions/action-payloads';
import { UserConfigurationActions } from 'background/actions/user-configuration-actions';
import { UserConfigurationActionCreator } from 'background/global-action-creators/user-configuration-action-creator';
import { IMock, Mock } from 'typemoq';

import { createActionMock } from './action-creator-test-helpers';

describe('UserConfigurationActionCreator', () => {
    it('handles GetCurrentState message', () => {
        const payload = null;
        const getCurrentStateMock = createActionMock<null>(payload);
        const actionsMock = createActionsMock('getCurrentState', getCurrentStateMock.object);
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.getUserConfigurationState();

        getCurrentStateMock.verifyAll();
    });

    it('should SetTelemetryConfig message', () => {
        const setTelemetryState = true;

        const setTelemetryStateMock = createActionMock(setTelemetryState);
        const actionsMock = createActionsMock('setTelemetryState', setTelemetryStateMock.object);
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.setTelemetryState(setTelemetryState);

        setTelemetryStateMock.verifyAll();
    });

    it('should SetHighContrastConfig message', () => {
        const payload: SetHighContrastModePayload = {
            enableHighContrast: true,
        };
        const setHighContrastConfigMock = createActionMock(payload);
        const actionsMock = createActionsMock(
            'setHighContrastMode',
            setHighContrastConfigMock.object,
        );
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.setHighContrastMode(payload);

        setHighContrastConfigMock.verifyAll();
    });

    it('should SetBugService message', () => {
        const payload: SetIssueFilingServicePayload = {
            issueFilingServiceName: 'none',
        };
        const setBugServiceMock = createActionMock(payload);
        const actionsMock = createActionsMock('setIssueFilingService', setBugServiceMock.object);
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.setIssueFilingService(payload);

        setBugServiceMock.verifyAll();
    });

    it('should SetBugServiceProperty message', () => {
        const payload: SetIssueFilingServicePropertyPayload = {
            issueFilingServiceName: 'bug-service-name',
            propertyName: 'property-name',
            propertyValue: 'property-value',
        };
        const setIssueFilingServicePropertyMock = createActionMock(payload);
        const actionsMock = createActionsMock(
            'setIssueFilingServiceProperty',
            setIssueFilingServicePropertyMock.object,
        );
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.setIssueFilingServiceProperty(payload);

        setIssueFilingServicePropertyMock.verifyAll();
    });

    it('should SaveIssueFilingSettings message', () => {
        const payload: SaveIssueFilingSettingsPayload = {
            issueFilingServiceName: 'test bug service',
            issueFilingSettings: { name: 'issueFilingSettings' },
        };
        const setIssueFilingSettings = createActionMock(payload);
        const actionsMock = createActionsMock(
            'saveIssueFilingSettings',
            setIssueFilingSettings.object,
        );
        const testSubject = new UserConfigurationActionCreator(actionsMock.object);

        testSubject.saveIssueFilingSettings(payload);

        setIssueFilingSettings.verifyAll();
    });

    function createActionsMock<ActionName extends keyof UserConfigurationActions>(
        actionName: ActionName,
        action: UserConfigurationActions[ActionName],
    ): IMock<UserConfigurationActions> {
        const actionsMock = Mock.ofType<UserConfigurationActions>();
        actionsMock.setup(actions => actions[actionName]).returns(() => action);
        return actionsMock;
    }
});
