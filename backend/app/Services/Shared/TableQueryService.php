<?php

declare(strict_types=1);

namespace App\Services\Shared;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class TableQueryService
{
    public function apply(
        array $data,
        Builder|Relation $query,
        array $searchable = [],
    ): Builder|Relation {
        $filter = isset($data['filter'])
            ? json_decode($data['filter'], true)
            : null;

        $sortBy = isset($data['sort_by'])
            ? json_decode($data['sort_by'], true)
            : null;

        $search = $data['search'] ?? null;

        $query = $this->applyFilters($query, $filter);
        $query = $this->applySearch($query, $search, $searchable);

        return $this->applySorting($query, $sortBy);
    }

    private function applyFilters(Builder|Relation $query, ?array $filter): Builder|Relation
    {
        if (! $filter || ! isset($filter['field'], $filter['operator'], $filter['value'])) {
            return $query;
        }

        $field = $filter['field'];
        $operator = $filter['operator'];
        $value = $filter['value'];

        return match ($operator) {
            'contains' => $query->whereLike($field, sprintf('%%%s%%', $value)),
            'doesNotContain' => $query->whereNotLike($field, sprintf('%%%s%%', $value)),
            'equals' => $query->where($field, $value),
            'doesNotEqual' => $query->whereNot($field, $value),
            'startsWith' => $query->whereLike($field, $value . '%'),
            'endsWith' => $query->whereLike($field, '%' . $value),
            'doesNotStartWith' => $query->whereNotLike($field, $value . '%'),
            'doesNotEndWith' => $query->whereNotLike($field, '%' . $value),
            'isEmpty' => $query->where(function ($q) use ($field): void {
                $q->whereNull($field)
                    ->orWhere($field, '');
            }),
            'isNotEmpty' => $query->where(function ($q) use ($field): void {
                $q->whereNotNull($field)
                    ->whereNot($field, '');
            }),
            'isAnyOf' => $query->whereIn($field, is_array($value) ? $value : [$value]),
            default => $query,
        };
    }

    private function applySearch(
        Builder|Relation $query,
        ?string $search,
        array $columns = []
    ): Builder|Relation {
        if (! $search || $columns === []) {
            return $query;
        }

        return $query->where(function ($q) use ($search, $columns): void {
            foreach ($columns as $column) {
                $q->orWhereLike($column, sprintf('%%%s%%', $search));
            }
        });
    }

    private function applySorting(Builder|Relation $query, ?array $sortBy): Builder|Relation
    {
        if ($sortBy && isset($sortBy['field'], $sortBy['sort'])) {
            return $query->orderBy($sortBy['field'], $sortBy['sort']);
        }

        return $query->oldest('created_at');
    }
}
