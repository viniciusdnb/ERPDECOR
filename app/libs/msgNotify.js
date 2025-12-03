module.exports = {
    getMsgError: function (title, text) {
        return {
            title: title,
            text: text,
            type: 'error',
            position: 'center',
            duration: 5
        }
    },
    getMsgWarning: function (title, text) {
        return {
            title: title,
            text: text,
            type: 'warning',
            position: 'center',
            duration: 5
        }
    },
    getMsgSuccess: function (title, text) {
        return {
            title: title,
            text: text,
            type: 'success',
            position: 'center',
            duration: 5
        }
    },
    getMsgInfo: function (title, text) {
        return {
            title: title,
            text: text,
            type: 'info',
            position: 'center',
            duration: 5
        }
    },
    getMsgRouter: function (type, title, text) {
        switch (type) {
            case 'error':
                return this.getMsgError(title, text);
                
            case 'warning':
                return this.getMsgWarning(title, text);
                
            case 'success':
                return this.getMsgSuccess(title, text);
                
            case 'info':
                return this.getMsgInfo(title, text);
                
        }
    }
}