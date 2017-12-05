function ReceiptClass() {
    this.initlize();
}
ReceiptClass.prototype = (new DeviceClass()).extend({
    initlize: function () {
        this.AttrList = {
            'ServiceName': 'ReceiptPrinter310',
            'Binnum': '0',
            'InstanceName': '',
            'alignment': '0',
            'offsetX': '0',
            'offsetY': '0',
            'resolution': '2',
            'dwMediaControl': '4'
        };
        this.OnlyReadAttrList = ['StMedia', 'StDeviceStatus', 'StPaper'];
        this.EvtList = {
            'MediaTaken': [],
            'ResetOver': [],
            'RetractMediaOver': [],
            'PrintFormOver': [],
            'PrintTextOver': [],
            'FormListOver': [{'name': 'listForm', 'type': 'obj'}],
            'QueryFormOver': [{'name': 'formHeader', 'type': 'obj'}],
            'QueryFieldOver': [{'name': 'fields', 'type': 'obj'}],
            'MediaListOver': [{'name': 'listMedia', 'type': 'obj'}],
            'QueryMediaOver': [{'name': 'media', 'type': 'obj'}],
            'RetractBinThreshHold': [{'name': 'binStatus', 'type': 'single'}],
            'PaperThreshHold': [{'name': 'paperStatus', 'type': 'single'}],
            'TonerThreshHold': [{'name': 'tonerStaus', 'type': 'single'}],
            'ResetOver': [],
            'RetractMediaOver': [],
            'PrintFormOver': [],
            'ControlMediaOver': [],
            'WaitCancelled': [{'name': 'cmdName', 'type': 'single'}]
        };
    },
    ControlMedia: function (mediaCtrl) {
        this.execute('ControlMedia', mediaCtrl);
    },
    FormList: function () {
        this.execute('FormList');
    },
    QueryForm: function (formName) {
        this.execute('QueryForm', formName);
    },
    QueryField: function (formName, fieldName) {
        this.execute('QueryField', formName, fieldName);
    },
    MediaList: function () {
        this.execute('MediaList');
    },
    QueryMedia: function (mediaName) {
        this.execute('QueryMedia', mediaName);
    },
    PrintForm: function (formName, mediaName, fields, timeout) {
        if (siu) {
            siu.ControlGuideLightSync(4, g_siu_speed);
        }
        ;
        this.execute('PrintForm', formName, mediaName, this.AttrList.alignment, this.AttrList.offsetX, this.AttrList.offsetY, this.AttrList.resolution, this.AttrList.dwMediaControl, fields, timeout);
    },
    PrintText: function (printText) {
        if (siu) {
            siu.ControlGuideLightSync(4, g_siu_speed);
        }
        ;
        this.execute('PrintText', printText);
    },
    ResetCountSync: function () {
        return this.execute('ResetCountSync');
    },
    Reset: function (action) {
        this.execute('Reset', action, this.AttrList.Binnum);
    },
    RetractMedia: function () {
        return this.execute('RetractMedia');
    },
    CancelWait: function () {
        this.execute('CancelWait');
    },
    createSpecialLisener: function () {
        this.WriteEventScript(this.id, this.name, this.EvtList);
    }
});

receipt = new ReceiptClass();
receipt.setObjName('receipt');
receipt.loadOcx({
    clsid: 'A154B77C-416A-4D66-8710-127AABFD9346',
    param: [{name: '_Version', value: '120'}, {name: '_StockProps', value: '0'}]
});
receipt.createLisener();
receipt.createSpecialLisener();
if (receipt.isDbg()) {
    var receiptdemo = {};
    receiptdemo.command = '', receiptdemo.arg = '', receiptdemo.asyncval = "";
    receipt.execute = function (cmd) {
        var async = true;
        if (cmd != 'OpenConnectionSync' && cmd != 'OpenConnection')	// Common error handle cmd
        {
            if (currentdevlist.indexOf(this.name) < 0)
                currentdevlist += this.name + ',';
        }
        if (cmd.indexOf('Sync') > 0)
            async = false;

        switch (cmd) {
            case 'getAttribute':
                if (arguments[1] == "StDeviceStatus") {
                    receiptdemo.asyncval = "HEALTHY";
                } else if (arguments[1] == "StPaper") {
                    receiptdemo.asyncval = "PAPEROUT";
                }
                async = false;
            case 'setAttribute':
                async = false;
                break;
            default:
                receiptdemo.command = cmd + 'Over';
                break;
        }

        if (async) {
            var exestr = "";
            exestr = 'receipt.' + receiptdemo.command;
            if (eval(exestr)) {
                exestr += "('" + receiptdemo.arg + "')";
                eval(exestr);
            } else {
                exestr = "receipt.onEvent";
                if (eval(exestr)) {
                    exestr += "('" + receiptdemo.command + "','" + receiptdemo.arg + "')";
                    eval(exestr);
                }
            }
        } else {
            return receiptdemo.asyncval;
        }
    }
}