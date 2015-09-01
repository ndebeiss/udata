<style lang="less">
</style>

<template>
<datatable icon="cog"
    title="{{title}}"
    bodyclass="table-responsive no-padding"
    p="{{ p }}" track="false"
    loading="{{loading !== undefined ? loading : p.loading}}"
    fields="{{ fields }}"
    track="remote_id"
    empty="{{ empty }}"
    tint="{{job.status | statusClass}}">
    <header class="row">
        <div class="col-xs-12" v-class="col-md-6: job.created, col-md-12: job.created">
            <content></content>
        </div>
        <dl class="dl-horizontal col-xs-12 col-md-6" v-show="job.created">
            <dt>{{ _('Created at') }}</dt>
            <dd>{{ job.created | dt }}</dd>
            <dt>{{ _('Ended at') }}</dt>
            <dd>{{ job.ended | dt }}</dd>
            <dt>{{ _('Status') }}</dt>
            <dd><span class="label label-{{ job.status | statusClass }}">{{ job.status | statusI18n }}</span></dd>
            <dt v-if="job.errors && job.errors.length">{{ _('Errors') }}</dt>
            <dd v-if="job.errors && job.errors.length">
                <div v-repeat="error:job.errors">
                    <p><strong>{{{error.message | markdown}}}</strong></p>
                    <div v-if="error.details">
                    <code><pre>{{error.details}}</pre></code>
                    </div>
                </div>
            </dd>
            <dt v-if="job.items && job.items.length">{{ _('Items') }}</dt>
            <dd v-if="job.items && job.items.length">
                <span class="text-warning"
                    data-toggle="tooltip" data-placement="top"
                    title="{{ _('Number of skipped items') }}"
                    >{{job.items | count 'skipped'}}</span>
                /
                <span class="text-danger"
                    data-toggle="tooltip" data-placement="top"
                    title="{{ _('Number of failed items') }}"
                    >{{job.items | count 'failed'}}</span>
                /
                <span class="text-green"
                    data-toggle="tooltip" data-placement="top"
                    title="{{ _('Number of succeed items') }}"
                    >{{job.items | count 'done'}}</span>
                /
                <strong>{{job.items.length}}</strong>
            </dd>
        </dl>
    </header>
</datatable>
</template>

<script>
import {
    STATUS_CLASSES as JOB_STATUS_CLASSES,
    STATUS_I18N as JOB_STATUS_I18N,
    HarvestJob
} from 'models/harvest/job';
import {STATUS_CLASSES, STATUS_I18N} from 'models/harvest/item';
import {PageList} from 'models/base';
import $ from 'jquery';

export default {
    name: 'JobDetails',
    props: ['job', 'loading', 'empty'],
    components: {
        'datatable': require('components/datatable/widget.vue')
    },
    data: function() {
        return {
            job: new HarvestJob(),
            fields: [{
                label: this._('Remote ID'),
                key: 'remote_id',
                sort: 'remote_id',
                ellipsis: true
            }, {
                label: this._('Status'),
                key: 'status',
                sort: 'status',
                type: 'label',
                width: 100,
                label_type: function(status) {
                    return STATUS_CLASSES[status];
                },
                label_func: function(status) {
                    return STATUS_I18N[status];
                }
            }]
        };
    },
    computed: {
        title: function() {
            return this.job.id ? ('Job ' + this.job.id) : 'Job';
        },
        p: function() {
            return new PageList({data: this.job.items});
        }
    },
    events: {
        'datatable:item:click': function(item) {
            this.$dispatch('harvest:job:item:selected', item);
        }
    },
    filters: {
        statusClass: function(value) {
            return JOB_STATUS_CLASSES[value];
        },
        statusI18n: function(value) {
            return JOB_STATUS_I18N[value];
        },
        count: function(value, status) {
            if (!value) return '-';
            return value.filter(function(item) {
                return item.status === status;
            }).length;
        }
    },
    ready: function() {
         $('[data-toggle="tooltip"]').tooltip();
    }
};
</script>