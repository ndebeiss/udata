<template>
<div>
    <datatable :title="title" icon="building"
        boxclass="organizations-widget"
        :fields="fields "
        :p="organizations"
        :empty="_('No organization')">
    </datatable>
</div>
</template>

<script>
import Datatable from 'components/datatable/widget.vue';

export default {
    name: 'organizations-list',
    components: {Datatable},
    MASK: ['id', 'name', 'logo_thumbnail', 'created_at', 'metrics'],
    data() {
        return {
            title: this._('Organizations'),
            fields: [{
                key: 'logo_thumbnail',
                type: 'avatar',
                width: 30,
                placeholder: 'organization'
            },{
                label: this._('Name'),
                key: 'name',
                sort: 'name',
                align: 'left',
                type: 'text'
            }, {
                label: this._('Creation'),
                key: 'created_at',
                sort: 'created',
                align: 'left',
                type: 'timeago',
                width: 120
            }, {
                label: this._('Datasets'),
                key: 'metrics.datasets',
                sort: 'datasets',
                align: 'center',
                type: 'metric',
                width: 135
            }, {
                label: this._('Reuses'),
                key: 'metrics.reuses',
                sort: 'reuses',
                align: 'center',
                type: 'metric',
                width: 125
            }, {
                label: this._('Followers'),
                key: 'metrics.followers',
                sort: 'followers',
                align: 'center',
                type: 'metric',
                width: 95
            }, {
                label: this._('Views'),
                key: 'metrics.views',
                sort: 'views',
                align: 'center',
                type: 'metric',
                width: 95
            }]
        };
    },
    events: {
        'datatable:item:click': function(org) {
            this.$go(`/organization/${org.id}/`);
        }
    },
    props: ['organizations']
};
</script>
