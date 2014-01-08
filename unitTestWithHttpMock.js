'use strict';

describe('Unit: Testing ListView Directives', function () {

  var $compile, $httpBackend;
  var title, dataPath, data, emptyDataPath, scope, element;

  beforeEach(module('ui', 'scripts/ui/listView/template.html'));

  beforeEach(inject(
    ['$compile', '$rootScope', '$httpBackend',
      function ($c, $rootScope, httpBackend) {
        $compile = $c;
        scope = $rootScope;
        $httpBackend = httpBackend;

        data = [{
          'label': 'aLabel',
          'image': 'fixtures/images/icon1.png'
        }, {
          'label': 'anotherLabel',
          'image': 'fixtures/images/icon2.png'
        }];
        dataPath = 'listView.json';
        emptyDataPath = 'empty.json';
        title = 'aTitle';

        $httpBackend.expectGET(dataPath).respond(data);

        element = $compile('<div ui-list-view title="' + title + '" data-url=' + dataPath + '></div>')($rootScope);
        scope.$digest();
      }
    ]
  ));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should display the title text properly', function () {
    $httpBackend.flush();
    expect(element.html()).toContain(title);
  });


  it('should display items from a service', function () {
    $httpBackend.flush();
    expect(element.html()).toContain(data[0].label);
  });

});