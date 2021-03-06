import React, { PureComponent, Fragment } from 'react';
import { number, string, shape } from 'prop-types';

export default class Price extends PureComponent {
    static propTypes = {
        value: number.isRequired,
        currencyCode: string.isRequired,
        classes: shape({
            currency: string,
            integer: string,
            decimal: string,
            fraction: string
        })
    };

    static defaultProps = {
        classes: {}
    };

    render() {
        const { value, currencyCode, classes } = this.props;

        const parts = Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode
        }).formatToParts(value);

        const children = parts.map((part, i) => {
            const partClass = classes[part.type];
            const key = `${i}-${part.value}`;

            return (
                <span key={key} className={partClass}>
                    {part.value}
                </span>
            );
        });

        return <Fragment>{children}</Fragment>;
    }
}
