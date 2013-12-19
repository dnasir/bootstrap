describe('string to Date tests', function() {
    beforeEach(module('ui.bootstrap.stringToDate'));

    describe('stringToDate', function() {

        it('should convert string to Date object using provided formats', inject(function(stringToDateFilter) {
            var str1 = '17.12.2013',
                str2 = '17-12-2013 12:59',
                str3 = 'December 17, 2013 12:59',
                str4 = '4:15 in the morning';

            var format1 = 'dd.MM.yyyy',
                format2 = 'dd-MM-yyyy HH:mm',
                format3 = 'MMMM d, yyyy HH:mm',
                format4 = "h:m 'in the morning'";

            var expected1 = new Date(2013, 11, 17, 0, 0, 0),
                expected2 = new Date(2013, 11, 17, 12, 59, 0),
                expected3 = new Date(2013, 11, 17, 12, 59, 0);

            expect(stringToDateFilter(str1, format1).getTime()).toBe(expected1.getTime());
            expect(stringToDateFilter(str2, format2).getTime()).toBe(expected2.getTime());
            expect(stringToDateFilter(str3, format3).getTime()).toBe(expected3.getTime());

            var result4 = stringToDateFilter(str4, format4);
            expect(result4.getHours()).toBe(4);
            expect(result4.getMinutes()).toBe(15);
        }));

        it('should return undefined for invalid date strings', inject(function(stringToDateFilter) {
            var str1 = '29.02.2013',
                str2 = '31-04-2013',
                str3 = 'November 31, 2013';

            var format1 = 'dd.MM.yyyy',
                format2 = 'dd-MM-yyyy',
                format3 = 'MMMM d, yyyy';

            expect(stringToDateFilter(str1, format1)).toBeUndefined();
            expect(stringToDateFilter(str2, format2)).toBeUndefined();
            expect(stringToDateFilter(str3, format3)).toBeUndefined();
        }));

        describe('using various format strings', function() {

            it('fullDate', inject(function(stringToDateFilter) {
                var stringToConvert = 'Tuesday, December 17, 2013',
                    format = 'fullDate',
                    dateObj = new Date(2013, 11, 17, 0, 0, 0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('longDate', inject(function(stringToDateFilter) {
                var stringToConvert = 'December 17, 2013',
                    format = 'longDate',
                    dateObj = new Date(2013, 11, 17, 0, 0, 0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('mediumDate', inject(function(stringToDateFilter) {
                var stringToConvert = 'Dec 17, 2013',
                    format = 'mediumDate',
                    dateObj = new Date(2013, 11, 17, 0, 0, 0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('shortDate', inject(function(stringToDateFilter) {
                var stringToConvert = '12/17/13',
                    format = 'shortDate',
                    dateObj = new Date(2013, 11, 17, 0, 0, 0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('medium', inject(function(stringToDateFilter) {
                var stringToConvert = 'Dec 17, 2013 12:59:59 pm',
                    format = 'medium',
                    dateObj = new Date(2013, 11, 17, 12, 59, 59);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('short', inject(function(stringToDateFilter) {
                var stringToConvert = '12/17/13 12:59 pm',
                    format = 'short',
                    dateObj = new Date(2013, 11, 17, 12, 59, 0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('mediumTime', inject(function(stringToDateFilter) {
                var stringToConvert = '12:59:59 pm',
                    format = 'mediumTime',
                    dateObj = new Date();

                dateObj.setHours(12);
                dateObj.setMinutes(59);
                dateObj.setSeconds(59);
                dateObj.setMilliseconds(0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));

            it('shortTime', inject(function(stringToDateFilter) {
                var stringToConvert = '12:59 pm',
                    format = 'shortTime',
                    dateObj = new Date();

                dateObj.setHours(12);
                dateObj.setMinutes(59);
                dateObj.setSeconds(0);
                dateObj.setMilliseconds(0);

                var converted = stringToDateFilter(stringToConvert, format);

                expect(converted.getTime()).toBe(dateObj.getTime());
            }));
        });
    });
});