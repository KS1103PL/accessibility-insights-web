// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IMock, It, Mock, MockBehavior } from 'typemoq';

import { AssessmentsProvider } from 'assessments/types/assessments-provider';
import { AssessmentDataConverter } from 'background/assessment-data-converter';
import { InitialAssessmentStoreDataGenerator } from 'background/initial-assessment-store-data-generator';
import { AssessmentStore } from 'background/stores/assessment-store';
import {
    AssessmentData,
    AssessmentStoreData,
} from '../../../common/types/store-data/assessment-result-data';
import { VisualizationType } from '../../../common/types/visualization-type';
import { BaseDataBuilder } from './base-data-builder';

export class AssessmentsStoreDataBuilder extends BaseDataBuilder<AssessmentStoreData> {
    private storeDataGeneratorMock: IMock<InitialAssessmentStoreDataGenerator>;

    constructor(
        provider: AssessmentsProvider,
        dataConverter: AssessmentDataConverter,
        initialAssessmentStoreDataGenerator?: InitialAssessmentStoreDataGenerator,
    ) {
        super();
        this.data = new AssessmentStore(
            null,
            null,
            dataConverter,
            null,
            provider,
            null,
            null,
            initialAssessmentStoreDataGenerator || this.getPreparedMock(),
        ).getDefaultState();
    }

    private getPreparedMock(): InitialAssessmentStoreDataGenerator {
        this.storeDataGeneratorMock = Mock.ofType(
            InitialAssessmentStoreDataGenerator,
            MockBehavior.Strict,
        );
        const stubData: AssessmentStoreData = {
            persistedTabInfo: null,
            assessments: {},
            assessmentNavState: { selectedTestType: null, selectedTestStep: null },
            resultDescription: '',
        };

        this.storeDataGeneratorMock
            .setup(mock => mock.generateInitialState(It.isAny()))
            .returns(() => stubData);

        return this.storeDataGeneratorMock.object;
    }

    public withAssessment(
        assessmentName: string,
        data: AssessmentData,
    ): AssessmentsStoreDataBuilder {
        this.data.assessments[assessmentName] = data;
        return this;
    }

    public withSelectedTestType(visualizationType: VisualizationType): AssessmentsStoreDataBuilder {
        this.data.assessmentNavState.selectedTestType = visualizationType;
        return this;
    }

    public withSelectedTestStep(step: string): AssessmentsStoreDataBuilder {
        this.data.assessmentNavState.selectedTestStep = step;
        return this;
    }

    public withTargetTab(
        id: number,
        url: string,
        title: string,
        appRefreshed: boolean,
    ): AssessmentsStoreDataBuilder {
        this.data.persistedTabInfo = { id, url, title, appRefreshed };
        return this;
    }
}
