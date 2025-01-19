import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TagManagement.css'; // 引入样式文件

const TagManagement = () => {
  const [tags, setTags] = useState([]); // 存储大类标签列表
  const [selectedTag, setSelectedTag] = useState(null); // 当前选中的大类标签
  const [subTags, setSubTags] = useState([]); // 存储小标签
  const [selectedSubTag, setSelectedSubTag] = useState(null); // 当前选中的小标签
  const [newTagName, setNewTagName] = useState(''); // 新标签名称
  const [newTagStatus, setNewTagStatus] = useState(0); // 新标签状态
  const [newTagClassifications, setNewTagClassifications] = useState([]); // 新标签的父标签ID
  const [loading, setLoading] = useState(false); // 加载状态
  const [tagClassificationOptions, setTagClassificationOptions] = useState([]); // 大类标签选项
  const [selectedTagClassifications, setSelectedTagClassifications] = useState([]); // 小标签更新的父标签ID
  const [searchKeyword, setSearchKeyword] = useState(''); // 搜索关键词
  const [searchResults, setSearchResults] = useState([]); // 搜索结果

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQWNjb3VudCI6Ijg4ODg4ODg4IiwidXNlcklkZW50aXR5IjoiMiIsImlhdCI6MTczNjU5NDEwOCwiZXhwIjoxNzM3ODAzNzA4fQ.3vtlMNG74zEHNNs4UpfKKyheCgW_vqbkdcvj_wm73f4";

  const axiosInstance = axios.create({
    baseURL: "http://qms198.online:8088",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/tag-classifications/get/all')
      .then((response) => {
        if (response.data.code === 200 && Array.isArray(response.data.data)) {
          setTags(response.data.data);
          setTagClassificationOptions(response.data.data);
        } else {
          console.error('Invalid response format:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching tags:', error))
      .finally(() => setLoading(false));
  }, []);

  const fetchSubTags = (tagId) => {
    axiosInstance
      .get(`/tag-classifications/get/id`, {
        params: { id: tagId },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setSubTags(response.data.data.tags);
        } else {
          console.error('Failed to fetch sub-tags:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching sub-tags:', error);
      });
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSelectedSubTag(null);
    fetchSubTags(tag.id);
  };

  const handleSubTagClick = (subTag) => {
    setSelectedSubTag(subTag);
    setSelectedTagClassifications(subTag.tagClassificationIds || []);
  };

  const updateSubTag = () => {
    if (!selectedSubTag || selectedTagClassifications.length === 0) return;

    const updateData = {
      tag: {
        name: selectedSubTag.name,
        status: selectedSubTag.status,
      },
      tagClassificationIds: selectedTagClassifications,
      tagId: selectedSubTag.id,
    };

    axiosInstance
      .post('/tags/update', updateData)
      .then((response) => {
        if (response.data.code === 200) {
          alert('小标签更新成功');
        } else {
          alert('小标签更新失败');
        }
      })
      .catch((error) => {
        console.error('Error updating sub-tag:', error);
      });
  };

  const createTag = () => {
    if (!newTagName.trim() || newTagClassifications.length === 0) {
      alert('标签名称和父标签不能为空');
      return;
    }

    const createData = {
      tag: {
        name: newTagName,
        status: newTagStatus,
      },
      tagClassificationIds: newTagClassifications,
    };

    axiosInstance
      .post('/tags/create', createData)
      .then((response) => {
        if (response.data.code === 200) {
          alert('标签添加成功');
          setNewTagName('');
          setNewTagStatus(0);
          setNewTagClassifications([]);
          axiosInstance
            .get('/tag-classifications/get/all')
            .then((response) => {
              if (response.data.code === 200 && Array.isArray(response.data.data)) {
                setTags(response.data.data);
              }
            })
            .catch((error) => console.error('Error refreshing tags:', error));
        } else {
          alert('标签添加失败');
        }
      })
      .catch((error) => {
        console.error('Error creating tag:', error);
      });
  };

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;

    axiosInstance
      .get(`/tags/search?keyword=${searchKeyword}`)
      .then((response) => {
        if (response.data.code === 200) {
          setSearchResults(response.data.data);
        } else {
          console.error('Search failed:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error searching tags:', error);
      });
  };

  return (
    <div className="tag-management">
      <div className="sidebar">
        <h2>标签管理</h2>
        {loading && <p>加载中...</p>}
        <div className="tag-list">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className={`tag-item ${selectedTag && selectedTag.id === tag.id ? 'selected' : ''} ${tag.status === 1 ? 'red' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag.categoryName}
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="search-section">
          <div style={{ display: 'flex', alignItems: 'center' }} className='searchContainer'>
            <label style={{ marginRight: '10px' }}>搜索标签</label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="输入标签名称"
              style={{ marginRight: '10px'}}
            />
            <button onClick={handleSearch}>搜索</button>
          </div>

          <div className="search-results">
            {searchResults.map((result) => (
              <div key={result.id} className="search-result-item">
                <span>{result.name}</span>
                <button onClick={() => handleSubTagClick(result)}>修改</button>
              </div>
            ))}
          </div>
        </div>

        {selectedTag && (
          <div className="sub-tag-display">
            <h3>{selectedTag.categoryName} - 小标签</h3>
            <div className="sub-tags">
              {subTags.map((subTag) => (
                <span
                  key={subTag.id}
                  className={`sub-tag ${subTag.status === 1 ? 'red' : ''}`}
                  onClick={() => handleSubTagClick(subTag)}
                >
                  {subTag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedSubTag && (
          <div className="sub-tag-update">
            <h3>更新小标签</h3>
            <div className="row">
              <div>
                <label>小标签ID：</label>
                <span className="readonly-field">{selectedSubTag.id}</span>
              </div>
              <div>
                <label>小标签名称：</label>
                <input
                  type="text"
                  value={selectedSubTag.name}
                  onChange={(e) => setSelectedSubTag({ ...selectedSubTag, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label>状态：</label>
              <select
                value={selectedSubTag.status}
                onChange={(e) => setSelectedSubTag({ ...selectedSubTag, status: e.target.value })}
              >
                <option value={0}>正常</option>
                <option value={1}>禁用</option>
              </select>
            </div>
            <div>
              <label>选择大类标签：</label>
              <div className="checkbox-group">
                {tagClassificationOptions.map((option) => (
                  <label key={option.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={selectedTagClassifications.includes(option.id.toString())}
                      onChange={(e) => {
                        const selectedOptions = e.target.checked
                          ? [...selectedTagClassifications, option.id.toString()]
                          : selectedTagClassifications.filter(id => id !== option.id.toString());
                        setSelectedTagClassifications(selectedOptions);
                      }}
                    />
                    {option.categoryName}
                  </label>
                ))}
              </div>
            </div>
            <button onClick={updateSubTag}>提交更新</button>
          </div>
        )}
      </div>

      <div className="add-tag">
        <h3>添加新标签</h3>
        <div className="row">
          <div>
            <label>标签名称：</label>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
          </div>
          <div>
            <label>状态：</label>
            <select
              value={newTagStatus}
              onChange={(e) => setNewTagStatus(Number(e.target.value))}
            >
              <option value={0}>正常</option>
              <option value={1}>禁用</option>
            </select>
          </div>
        </div>
        <div>
          <label>选择父标签：</label>
          <div className="checkbox-group">
            {tagClassificationOptions.map((option) => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option.id}
                  checked={newTagClassifications.includes(option.id)}
                  onChange={(e) => {
                    const selectedOptions = e.target.checked
                      ? [...newTagClassifications, option.id]
                      : newTagClassifications.filter(id => id !== option.id);
                    setNewTagClassifications(selectedOptions);
                  }}
                />
                {option.categoryName}
              </label>
            ))}
          </div>
        </div>
        <button onClick={createTag}>提交添加</button>
      </div>
    </div>
  );
};

export default TagManagement;
