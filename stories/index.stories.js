import React, {Component} from 'react';

import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';

import { Guide } from './components/Guide';
import { Button, ButtonStyles } from '../client/components/Button';

const argsJsonStringify = decorateAction([ args => _.map( args, arg => JSON.stringify( arg ) ) ]);
const ButtonActions = {onClick:argsJsonStringify('onClick')};

storiesOf('Button', module)
	.add('Submit (enabled)', () => (
		<Guide src='guides/button-submit.png'>
			<Button  {...ButtonActions}>Submit</Button>
		</Guide>
	) )
	.add('Submit (disabled)', () => (
		<Guide src='guides/button-submit-disabled.png'>
			<Button className={ButtonStyles.disabled} {...ButtonActions}>Submit</Button>
		</Guide>
	) )
